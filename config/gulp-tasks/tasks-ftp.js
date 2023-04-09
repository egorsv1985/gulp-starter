export const ftp = () => {
	const ftpConfig = ftpSettings;
	ftpConfig.log = util.log;

	const ftpConnect = vinylFTP.create(ftpConfig)
		.on('error', function (err) {
			console.log('FTP Error:', err);
		});

	return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify({
				title: "FTP",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`))
		.pipe(util.noop())
		.on('end', function () {
			console.log('Files uploaded to FTP successfully!');
		});
};
