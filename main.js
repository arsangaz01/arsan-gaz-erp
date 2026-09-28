const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');
let win;
function createWindow() {
  win = new BrowserWindow({ width: 1280, height: 820, minWidth: 900, minHeight: 650, autoHideMenuBar: true, webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false } });
  win.loadFile(path.join(__dirname, 'src', 'index.html'));
}
function checkUpdates() {
  if (!app.isPackaged) return;
  autoUpdater.autoDownload = false;
  autoUpdater.on('update-available', async info => {
    const r = await dialog.showMessageBox(win, { type: 'info', buttons: ['Güncelle', 'Sonra'], message: `Arsan Gaz ERP ${info.version} hazır.` });
    if (r.response === 0) autoUpdater.downloadUpdate();
  });
  autoUpdater.on('update-downloaded', async () => {
    const r = await dialog.showMessageBox(win, { type: 'info', buttons: ['Yeniden başlat ve kur', 'Sonra'], message: 'Güncelleme kurulmaya hazır.' });
    if (r.response === 0) autoUpdater.quitAndInstall();
  });
  autoUpdater.checkForUpdates().catch(e => win.webContents.send('update-status', e.message));
}
app.whenReady().then(() => { createWindow(); setTimeout(checkUpdates, 3000); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
ipcMain.handle('app-version', () => app.getVersion());
ipcMain.handle('check-update', () => checkUpdates());
