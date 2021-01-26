import errToString from "./error"
const tools = require("./tools")

const PRINT_SHOW = true //开启流程展示

/**
 * 蓝牙流程：
 * 1.先初始化蓝牙适配器
 * 2.搜寻附近的蓝牙外围设备
 */

class BLE {
    constructor(blename) {
        this.blename = blename;
        this.uuid = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"
    }
    async init() {
        let [adapter_err, adapter] = await _openAdapter.call(this)
        if (adapter_err != null) {
            showline(`初始化失败！${adapter_err}`)
            return
        }
        showline(`初始化成功！`)

        _startSearch.call(this)
    }
}


function _openAdapter() {
    showline(`准备初始化蓝牙适配器...`)
    return wx.openBluetoothAdapter().then(
        res => [null, res],
        err => [errToString(err), null]
    )

}

/**
 * @param {Array<string>} services 
 */
function _startSearch() {
    showline(`准备搜寻附近的蓝牙外围设备...`)
    return tools.promisify(wx.startBluetoothDevicesDiscovery, {
        services: [this.uuid],
    }).then(res => {
        console.log('ok')
    }, err => {
        console.log('not ok', err)
    })
}


function showline(str) {
    PRINT_SHOW ? console.log(str) : null
}

BLE.prototype.deviceId = "";

export { BLE };
