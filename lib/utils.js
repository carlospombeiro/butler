const fs = require('fs');

function fileExistsSync(path) {
  return fileOrDirectoryExistsSync(path, false);
}

function directoryExistsSync(path) {
  return fileOrDirectoryExistsSync(path, true);
}

function fileOrDirectoryExistsSync(path, directory) {
  try {
    if (directory)
      return fs.statSync(path).isDirectory();
    else
    return fs.statSync(path).isFile();
  } catch (e) {
    if (e.code === 'ENOENT') {
      return false;
    } else {
      return false;
      //throw e;
    }
  }
}

module.exports.fileExistsSync = fileExistsSync;
module.exports.directoryExistsSync = directoryExistsSync;
module.exports.fileOrDirectoryExistsSync = fileOrDirectoryExistsSync;