import fs from 'fs';

export const gitignore = async () => {
  if (!fs.existsSync('.gitignore')) {
    await fs.promises.writeFile('./.gitignore', '');
    await fs.promises.appendFile('./.gitignore', 'phpmailer/\r\n');
    await fs.promises.appendFile('./.gitignore', 'package-lock.json\r\n');
    await fs.promises.appendFile('./.gitignore', 'flsStartTemplate/\r\n');
    await fs.promises.appendFile('./.gitignore', 'node_modules/\r\n');
    await fs.promises.appendFile('./.gitignore', '.gitignore\r\n');
    await fs.promises.appendFile('./.gitignore', 'dist/\r\n');
    await fs.promises.appendFile('./.gitignore', 'Source/\r\n');
    await fs.promises.appendFile('./.gitignore', 'version.json\r\n');
    await fs.promises.appendFile('./.gitignore', app.buildFolder + '\r\n');
    await fs.promises.appendFile('./.gitignore', '**/*.zip\r\n');
    await fs.promises.appendFile('./.gitignore', '**/*.rar\r\n');
  }
  return app.gulp.src(`${app.path.srcFolder}`);
}
