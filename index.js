///npx electron-packager d:\wamp64\www\skola\electron\app FCreator --platform=win32 --arch=x64  --icon= d:\wamp64\www\skola\electron\app\public\css\icon.ico
const
{
  app
  , contextBridge
  , ipcRenderer
  , BrowserView
  , BrowserWindow
  , dialog
  , Menu
  , Tray
  , ipcMain
} = require('electron');
const path = require("path");
const fs = require('fs');
const url = require('url');
const apath = app.getAppPath().replace('app.asar', 'app.asar.unpacked');
const workdir = app.getPath("userData");
console.log(workdir)
const masterDir = path.join(workdir, "./master");
const cacheDir = path.join(masterDir, './cache/');
const outputDir = path.join(masterDir, './output/');
const tmpDir = path.join(masterDir, './videotmp/');
let sendtype = "";
let savePath = "";
let saveVideoPath = "";
let mainWindow = [];
let splash, propratiesWin;
global.sharedObject = {
  prop1: process.argv
}
app.on("ready", () =>
{
  showSplash();
  showSelectWin()
  showOdabirWindow();
  if (!fs.existsSync(masterDir))
  {
    fs.mkdirSync(masterDir);
  }
  if (!fs.existsSync(workdir))
  {
    fs.mkdirSync(workdir);
  }
  createFolder(tmpDir);
  propratiesWin.once('ready-to-show', () =>
  {
    splash.destroy();
    odabirWindow.hide();
    splash = null;
    propratiesWin.show();
  });
});
const getAppDataPath = function(folder)
{
  switch (process.platform)
  {
    case "darwin":
    {
      return path.join(process.env.HOME, "Library", "Application Support", folder);
    }
    case "win32":
    {
      return path.join(process.env.APPDATA, folder);
    }
    case "linux":
    {
      return path.join(process.env.HOME, "." + folder);
    }
    default:
    {
      console.log("Unsupported platform!");
      process.exit(1);
    }
  }
}
const createFolder = function(f)
{
  if (!fs.existsSync(f))
  {
    fs.mkdirSync(f);
  }
  else
  {
    fs.rm(f
    , {
      recursive: true
      , force: true
    }, err =>
    {
      if (err)
      {
        throw err;
      }
      createFolder(f);
    });
  }
}

function showSelectWin()
{
  let menu = Menu.buildFromTemplate([
    {
      label: 'Odaberite'
      , submenu: [
        {
          label: 'Izlaz'
          , click()
          {
            app.quit()
          }
    }]
  }])
  propratiesWin = new BrowserWindow(
  {
    width: 800
    , height: 600
    , transparent: false
    , frame: true
    , alwaysOnTop: true
    , resizable: false
    , title: "FCreator"
    , webPreferences:
    {
      contextIsolation: false
      , nodeIntegration: true
      , enableRemoteModule: true
      , enableremotemodule: true
      , webSecurity: false
      , autoHideMenuBar: true
      , show: false
      , allowRunningInsecureContent: false
      , maximizable: false
    }
  , });
  propratiesWin.setIcon(path.join(__dirname, 'public/css/icon.png'));
   propratiesWin.setMenu(menu);
  propratiesWin.setResizable(false)
  propratiesWin.loadFile("public/odabir.html");
  propratiesWin.on('close', function()
  {
    app.quit()
  })
}

function showSplash()
{
  splash = new BrowserWindow(
  {
    width: 500
    , height: 300
    , transparent: true
    , frame: false
    , alwaysOnTop: true
    , resizable: false
    , title: "FCreator"
  });
  splash.loadFile("public/splash.html");
}

function showOdabirWindow()
{
  let menu = Menu.buildFromTemplate([
    {
      label: 'Odaberite'
      , submenu: [
        {
          label: 'Izlaz'
          , click()
          {
            app.quit()
          }
    }]
  }])
  odabirWindow = new BrowserWindow(
  {
    title: "FCreator"
    , webPreferences:
    {
      contextIsolation: false
      , nodeIntegration: true
      , enableRemoteModule: true
      , enableremotemodule: true
      , webSecurity: false,
      // autoHideMenuBar: true,
      show: false
      , allowRunningInsecureContent: false
      , maximizable: false
    }
  , });
  odabirWindow.loadURL(url.format(
  {
    pathname: path.join(__dirname, 'public/pocetna.html')
    , protocol: 'file:'
    , slashes: true
  }));
  odabirWindow.setIcon(path.join(__dirname, 'public/css/icon.png'));
  //odabirWindow.setMenu(menu);
  odabirWindow.on("closed", function() {});
}

function createWindow(arg)
{
  id = mainWindow.length;
  let menu = Menu.buildFromTemplate([
    {
      label: 'Odaberite'
      , submenu: [
        {
          label: 'Izlaz'
          , click()
          {
            mainWindow[id].destroy();
            mainWindow[id] = null;
            odabirWindow.show();
          }
    }]
  }])
  mainWindow[id] = new BrowserWindow(
  {
    title: "FCreator"
    , webPreferences:
    {
      contextIsolation: false
      , nodeIntegration: true
      , enableRemoteModule: true
      , enableremotemodule: true
      , webSecurity: false,
       //autoHideMenuBar: true,
      show: false
      , allowRunningInsecureContent: false
      , maximizable: false
    }
  , });
  mainWindow[id].loadURL(url.format(
  {
    pathname: path.join(__dirname, 'public/index.html')
    , protocol: 'file:'
    , slashes: true
  }));
  ///mainWindow.setMenu(menu);
  mainWindow[id].setIcon(path.join(__dirname, 'public/css/icon.png'));
  ///mainWindow.setMenuBarVisibility(false)
  mainWindow[id].on("closed", function()
  {
    mainWindow[id].destroy();
    mainWindow[id] = null;
    odabirWindow.show();
  });
  mainWindow[id].maximize()
  mainWindow[id].show();
  mainWindow[id].setMenu(menu);
  mainWindow[id].webContents.on('did-finish-load', () =>
  {
    mainWindow[id].webContents.send('config', arg);
  })
}
app.whenReady(() =>
{
  app.allowRendererProcessReuse = false
})
app.on("window-all-closed", function()
{
  if (process.platform !== "darwin")
  {
    app.quit();
  }
});
ipcMain.on('save-video-file', (event, files) =>
{
  if (saveVideoPath != "")
  {
    event.reply('save-video-files', saveVideoPath);
    return;
  }
  dialog.showSaveDialog(
  {
    title: 'Snimanje videa ili slike'
    , filters: [
      {
        name: 'video'
        , extensions: ['mp4']
    },{
      name: 'slika'
      , extensions: ['gif']
  }, ]
  , }).then((file) =>
  {
    if (!file.canceled)
    {
      const filepath = file.filePath.toString();
      saveVideoPath = filepath;
      event.reply('save-video-files', filepath);
    }
  }).catch((err) =>
  {});
});
ipcMain.on('save-file', (event, files) =>
{
  if (savePath != "")
  {
      odabirWindow.webContents.send('save-files', savePath);
    return;
  }
  dialog.showSaveDialog(
  {
    title: 'Snimanje fajlova'
    , filters: [
      {
        name: 'priprema za video'
        , extensions: ['video']
    }, ]
  , }).then((file) =>
  {
    if (!file.canceled)
    {
      const filepath = file.filePath.toString();
      savePath = filepath;
        odabirWindow.webContents.send('save-files', filepath);
    }
  }).catch((err) =>
  {});
});
ipcMain.on('get-audio-file', (event) =>
{
  dialog.showOpenDialog(
  {
    title: 'Odaberite audio'
    , buttonLabel: 'Odaberi',
    // Restricting the user to only Text Files.
    filters: [
      {
        name: 'Audio'
        , extensions: ['mp3','wav']
    }, ],
    // Specifying the File Selector Property
    properties: ['openFile']
  }).then(file =>
  {
    if (!file.canceled)
    {
      const filepath = file.filePaths[0].toString();
      event.reply('AudioFile', filepath);
    }
  }).catch(err =>
  {
    console.log(err)
  });
});
ipcMain.on('video-request', (event) =>
{
  dialog.showOpenDialog(
  {
    title: 'Odaberite video'
    , buttonLabel: 'Odaberi',
    // Restricting the user to only Text Files.
    filters: [
      {
        name: 'Video'
        , extensions: ['mp4']
    }, ],
    // Specifying the File Selector Property
    properties: ['openFile']
  }).then(file =>
  {
    if (!file.canceled)
    {
      const filepath = file.filePaths[0].toString();
      event.reply('VideoFile', filepath);
    }
  }).catch(err =>
  {
    console.log(err)
  });
});
ipcMain.on('file-request', (event) =>
{
  dialog.showOpenDialog(
  {
    title: 'Odaberite sliku'
    , buttonLabel: 'Odaberi'
    , filters: [
      {
        name: 'Slike'
        , extensions: ['jpg', 'png']
    }, ]
    , properties: ['openFile']
  }).then(file =>
  {
    if (!file.canceled)
    {
      const filepath = file.filePaths[0].toString();
      event.reply('ImgFile', filepath);
    }
  }).catch(err =>
  {
    console.log(err)
  });
});
ipcMain.on('message', (event) =>
{
  dialog.showSaveDialog(
  {
    title: 'Sačuvaj video'
    , buttonLabel: 'Sačuvaj'
    , filters: [
      {
        name: 'mp4'
        , extensions: ['mp4']
    }, ]
    , properties: ['saveFile']
  }).then((file) =>
  {
    if (!file.canceled)
    {
      const filepath = file.filePath;
      console.log(filepath)
      event.sender.send('sendpath', filepath);
    }
  }).catch((...args) =>
  {})
})
ipcMain.on('open-config', (event) =>
{
    propratiesWin.hide();
  console.log('open config');
  dialog.showOpenDialog(
  {
    title: 'Odaberite pripremu za video'
    , buttonLabel: 'Odaberi'
    , filters: [
      {
        name: 'priprema za video'
        , extensions: ['video']
    }, ]
    , properties: ['openFile']
  }).then(file =>
  {
    if (!file.canceled)
    {
      const filepath = file.filePaths[0].toString();
      files=fs.readFileSync(filepath);
      savePath = filepath;
      propratiesWin.hide();
      propratiesWin.destroy();
      propratiesWin = null;
      odabirWindow.maximize()
      odabirWindow.show();
     odabirWindow.webContents.send('old-config',JSON.parse(files));

  }else{
      propratiesWin.show();
  }
  }).catch(err =>
  {
      propratiesWin.show();
    console.log(err)
  });

});
ipcMain.on('send-config', (event, arg) =>
{
  console.log('config');
  console.log(arg);
  propratiesWin.hide();
  propratiesWin.destroy();
  propratiesWin = null;
  odabirWindow.maximize()
  odabirWindow.show();
  odabirWindow.webContents.send('config', arg);
});
ipcMain.on('send-to-scenes', (event, arg) =>
{
  console.log('main-config');
  console.log(arg);
  mainWindow[mainWindow.length - 1].hide();
  mainWindow[mainWindow.length - 1].destroy();
  mainWindow[mainWindow.length - 1] = null;
  odabirWindow.maximize()
  odabirWindow.show();
  odabirWindow.webContents.send('main-config', arg);
});
ipcMain.on('send-to-animation-config', (event, arg) =>
{
  console.log('config');
  console.log(arg);
  odabirWindow.hide();
  createWindow(arg);
});
