// v1.0.0
// publish 2.x 也是用这个文件，需要做兼容
let isPublish2 = process.argv[2].includes("publish_xmgame.js") && process.argv[3].includes("--evn=publish2");
// 获取Node插件和工作路径
let ideModuleDir, workSpaceDir;
if (isPublish2) {
	//是否使用IDE自带的node环境和插件，设置false后，则使用自己环境(使用命令行方式执行)
	const useIDENode = process.argv[0].indexOf("LayaAir") > -1 ? true : false;
	ideModuleDir = useIDENode ? process.argv[1].replace("gulp\\bin\\gulp.js", "").replace("gulp/bin/gulp.js", "") : "";
	workSpaceDir = useIDENode ? process.argv[2].replace("--gulpfile=", "").replace("\\.laya\\publish_xmgame.js", "").replace("/.laya/publish_xmgame.js", "") + "/" : "./../";
} else {
	ideModuleDir = global.ideModuleDir;
	workSpaceDir = global.workSpaceDir;
}

//引用插件模块
const gulp = require(ideModuleDir + "gulp");
const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const del = require(ideModuleDir + "del");
let commandSuffix = ".cmd";

let prevTasks = ["packfile"];
if (isPublish2) {
	prevTasks = "";
}

let 
    config,
	platform,
	releaseDir,
    tempReleaseDir, // 小米临时拷贝目录
	projDir; // 小米快游戏工程目录
// 创建小米项目前，拷贝小米引擎库、修改index.js
// 应该在publish中的，但是为了方便发布2.0及IDE 1.x，放在这里修改
gulp.task("preCreate_XM", prevTasks, function() {
	if (isPublish2) {
		let pubsetPath = path.join(workSpaceDir, ".laya", "pubset.json");
		let content = fs.readFileSync(pubsetPath, "utf8");
		let pubsetJson = JSON.parse(content);
		platform = "xmgame";
		releaseDir = path.join(workSpaceDir, "release", platform).replace(/\\/g, "/");
		releaseDir = tempReleaseDir = path.join(releaseDir, "temprelease");
		config = pubsetJson[4]; // 只用到了 config.xmInfo|config.xmSign
	} else {
		platform = global.platform;
		releaseDir = global.releaseDir;
		tempReleaseDir = global.tempReleaseDir;
		config = global.config;
	}
	// 如果不是小米快游戏
	if (platform !== "xmgame") {
		return;
	}
	if (process.platform === "darwin") {
		commandSuffix = "";
	}
	let copyLibsList = [`${workSpaceDir}/bin/libs/laya.xmmini.js`];
	var stream = gulp.src(copyLibsList, { base: `${workSpaceDir}/bin` });
	return stream.pipe(gulp.dest(tempReleaseDir));
});

gulp.task("copyPlatformFile_XM", ["preCreate_XM"], function() {
	// 如果不是小米快游戏
	if (platform !== "xmgame") {
		return;
	}
	let xmAdapterPath = path.join(ideModuleDir, "../", "out", "layarepublic", "LayaAirProjectPack", "lib", "data", "xmfiles");
	let copyLibsList = [`${xmAdapterPath}/**/*.*`];
	var stream = gulp.src(copyLibsList);
	return stream.pipe(gulp.dest(tempReleaseDir));
});

// 新建小米项目-小米项目与其他项目不同，需要新建小米快游戏项目，并打包成.rpk文件
gulp.task("createProj_XM", ["copyPlatformFile_XM"], function() {
	// 如果不是小米快游戏
	if (platform !== "xmgame") {
		return;
	}
	releaseDir = path.dirname(releaseDir);
	projDir = path.join(releaseDir, config.xmInfo.projName);
	// 如果有即存项目，不再新建
	let isProjExist = fs.existsSync(projDir + "/node_modules") && 
					  fs.existsSync(projDir + "/sign");
	if (isProjExist) {
		return;
	}
	return new Promise((resolve, reject) => {
		console.log("开始创建小米快游戏项目，请耐心等待(预计需要10分钟)...");
		let cmd = `npx${commandSuffix}`;
		let args = ["create-quickgame", config.xmInfo.projName, `path=${releaseDir}`,
					`package=${config.xmInfo.package}`, `versionName=${config.xmInfo.versionName}`,
					`versionCode=${config.xmInfo.versionCode}`, `minPlatformVersion=${config.xmInfo.minPlatformVersion}`,
                    `icon=./layaicon/${path.basename(config.xmInfo.icon)}`, `name=${config.xmInfo.name}`, `rebuild=true`];
        console.log(JSON.stringify(args));
        
        let cp = childProcess.spawn(cmd, args);
        
		cp.stdout.on('data', (data) => {
			console.log(`stdout: ${data}`);
		});
		
		cp.stderr.on('data', (data) => {
			console.log(`stderr: ${data}`);
			// reject();
		});
		
		cp.on('close', (code) => {
			console.log(`子进程退出码：${code}`);
			resolve();
		});
	});
});

// 拷贝文件到小米快游戏
gulp.task("copyFileToProj_XM", ["createProj_XM"], function() {
	// 如果不是小米快游戏
	if (platform !== "xmgame") {
		return;
	}
	// 将临时文件夹中的文件，拷贝到项目中去
	let originalDir = `${tempReleaseDir}/**/*.*`;
	let stream = gulp.src(originalDir);
	return stream.pipe(gulp.dest(path.join(projDir)));
});

// 拷贝icon到小米快游戏
gulp.task("copyIconToProj_XM", ["copyFileToProj_XM"], function() {
	// 如果不是小米快游戏
	if (platform !== "xmgame") {
		return;
	}
	let originalDir = config.xmInfo.icon;
	let stream = gulp.src(originalDir);
	return stream.pipe(gulp.dest(path.join(projDir, "layaicon")));
});

// 清除小米快游戏临时目录
gulp.task("clearTempDir_XM", ["copyIconToProj_XM"], function() {
	// 如果不是小米快游戏
	if (platform !== "xmgame") {
		return;
	}
	// 删掉临时目录
	return del([tempReleaseDir], { force: true });
});

// 生成release签名(私钥文件 private.pem 和证书文件 certificate.pem )
gulp.task("generateSign_XM", ["clearTempDir_XM"], function() {
	// 如果不是小米快游戏
	if (platform !== "xmgame") {
		return;
    }
    if (!config.xmSign.generateSign) {
        return;
    }
	// https://doc.quickapp.cn/tools/compiling-tools.html
	return new Promise((resolve, reject) => {
		let cmd = "openssl";
		let args = ["req", "-newkey", "rsa:2048", "-nodes", "-keyout", "private.pem", 
					"-x509", "-days", "3650", "-out", "certificate.pem"];
		let opts = {
			cwd: projDir
		};
		let cp = childProcess.spawn(cmd, args, opts);
		cp.stdout.on('data', (data) => {
			console.log(`stdout: ${data}`);
		});

		cp.stderr.on('data', (data) => {
			console.log(`stderr: ${data}`);
			data += "";
			if (data.includes("Country Name")) {
				cp.stdin.write(`${config.xmSign.countryName}\n`);
				console.log(`Country Name: ${config.xmSign.countryName}`);
			} else if (data.includes("Province Name")) {
				cp.stdin.write(`${config.xmSign.provinceName}\n`);
				console.log(`Province Name: ${config.xmSign.provinceName}`);
			} else if (data.includes("Locality Name")) {
				cp.stdin.write(`${config.xmSign.localityName}\n`);
				console.log(`Locality Name: ${config.xmSign.localityName}`);
			} else if (data.includes("Organization Name")) {
				cp.stdin.write(`${config.xmSign.orgName}\n`);
				console.log(`Organization Name: ${config.xmSign.orgName}`);
			} else if (data.includes("Organizational Unit Name")) {
				cp.stdin.write(`${config.xmSign.orgUnitName}\n`);
				console.log(`Organizational Unit Name: ${config.xmSign.orgUnitName}`);
			} else if (data.includes("Common Name")) {
				cp.stdin.write(`${config.xmSign.commonName}\n`);
				console.log(`Common Name: ${config.xmSign.commonName}`);
			} else if (data.includes("Email Address")) {
				cp.stdin.write(`${config.xmSign.emailAddr}\n`);
				console.log(`Email Address: ${config.xmSign.emailAddr}`);
				// cp.stdin.end();
			}
			// reject();
		});

		cp.on('close', (code) => {
			console.log(`子进程退出码：${code}`);
			resolve();
		});
	});
});

// 拷贝sign文件到指定位置
gulp.task("copySignFile_XM", ["generateSign_XM"], function() {
	// 如果不是小米快游戏
	if (platform !== "xmgame") {
		return;
    }
    if (config.xmSign.generateSign) { // 新生成的签名
        // 移动签名文件到项目中（Laya & 小米快游戏项目中）
        let 
            privatePem = path.join(projDir, "private.pem"),
            certificatePem = path.join(projDir, "certificate.pem");
        let isSignExits = fs.existsSync(privatePem) && fs.existsSync(certificatePem);
        if (!isSignExits) {
            return;
        }
        let 
            xiaomiDest = `${projDir}/sign/release`,
            layaDest = `${workSpaceDir}/sign/release`;
        let stream = gulp.src([privatePem, certificatePem]);
        return stream.pipe(gulp.dest(xiaomiDest))
                    .pipe(gulp.dest(layaDest));
    } else if (config.xmInfo.useReleaseSign && !config.xmSign.generateSign) { // 使用release签名，并且没有重新生成
        // 从项目中将签名拷贝到小米快游戏项目中
        let 
            privatePem = path.join(workSpaceDir, "sign", "release", "private.pem"),
            certificatePem = path.join(workSpaceDir, "sign", "release", "certificate.pem");
        let isSignExits = fs.existsSync(privatePem) && fs.existsSync(certificatePem);
        if (!isSignExits) {
            return;
        }
        let 
            xiaomiDest = `${projDir}/sign/release`;
        let stream = gulp.src([privatePem, certificatePem]);
        return stream.pipe(gulp.dest(xiaomiDest));
    }
});

gulp.task("modifyFile_XM", ["copySignFile_XM"], function() {
	// 如果不是小米快游戏
	if (platform !== "xmgame") {
		return;
	}
	// 修改manifest.json文件
	let manifestPath = path.join(projDir, "manifest.json");
	if (!fs.existsSync(manifestPath)) {
		return;
	}
	let manifestContent = fs.readFileSync(manifestPath, "utf8");
	let manifestJson = JSON.parse(manifestContent);
	manifestJson.package = config.xmInfo.package;
	manifestJson.name = config.xmInfo.name;
	manifestJson.orientation = config.xmInfo.orientation;
	manifestJson.versionName = config.xmInfo.versionName;
	manifestJson.versionCode = config.xmInfo.versionCode;
	manifestJson.minPlatformVersion = config.xmInfo.minPlatformVersion;
	manifestJson.icon = `./layaicon/${path.basename(config.xmInfo.icon)}`;
	fs.writeFileSync(manifestPath, JSON.stringify(manifestJson, null, 4), "utf8");

	// 修改main.js文件
	let content = 'require("./qg-adapter.js");\nrequire("./libs/laya.xmmini.js");\nrequire("./index.js");';
	let mainJsPath = path.join(projDir, "main.js");
	fs.writeFileSync(mainJsPath, content, "utf8");

	// 小米项目，修改index.js
	let filePath = path.join(projDir, "index.js");
	if (!fs.existsSync(filePath)) {
		return;
	}
	let fileContent = fs.readFileSync(filePath, "utf8");
	fileContent = fileContent.replace(/loadLib(\(['"])/gm, "require$1./");
	fs.writeFileSync(filePath, fileContent, "utf8");
})

// 打包rpk
gulp.task("buildRPK", ["modifyFile_XM"], function() {
	// 如果不是小米快游戏
	if (platform !== "xmgame") {
		return;
	}
	// 在小米轻游戏项目目录中执行:
    // npm run build || npm run release
    let cmdStr = "build";
    if (config.xmInfo.useReleaseSign) {
        cmdStr = "release";
    }
	return new Promise((resolve, reject) => {
		let cmd = `npm${commandSuffix}`;
		let args = ["run", cmdStr];
		let opts = {
			cwd: projDir
		};
		let cp = childProcess.spawn(cmd, args, opts);
		// let cp = childProcess.spawn(`npx${commandSuffix}`, ['-v']);
		cp.stdout.on('data', (data) => {
			console.log(`stdout: ${data}`);
		});

		cp.stderr.on('data', (data) => {
			console.log(`stderr: ${data}`);
			// reject();
		});

		cp.on('close', (code) => {
			console.log(`子进程退出码：${code}`);
			resolve();
		});
	});
});

gulp.task("showQRCode", ["buildRPK"], function() {
	// 如果不是小米快游戏
	if (platform !== "xmgame") {
		return;
	}
	// 在小米轻游戏项目目录中执行:
	// npm run server
	return new Promise((resolve, reject) => {
		let cmd = `npm${commandSuffix}`;
		let args = ["run", "server"];
		let opts = {
			cwd: projDir
		};
		let cp = childProcess.spawn(cmd, args, opts);
		// let cp = childProcess.spawn(`npx${commandSuffix}`, ['-v']);
		cp.stdout.on('data', (data) => {
			console.log(`${data}`);
			// 输出pid，macos要用: macos无法kill进程树，也无法执行命令获取3000端口pid(没有查询权限)，导致无法kill这个进程
			console.log('xm_qrcode_pid:' + cp.pid);
		});

		cp.stderr.on('data', (data) => {
			console.log(`stderr: ${data}`);
			// reject();
		});

		cp.on('close', (code) => {
			console.log(`子进程退出码：${code}`);
			resolve();
		});
	});
});


gulp.task("buildXiaomiProj", ["showQRCode"], function() {
	console.log("all tasks completed");
});