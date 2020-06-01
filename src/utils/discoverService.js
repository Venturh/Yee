import { Discovery, Device } from 'yeelight-platform';

export const discovery = async () => {
  const devices = [];
  const discoveryService = new Discovery();
  await discoveryService.on('didDiscoverDevice', device => {
    const yeelight = new Device({ host: device.host, port: device.port });
    devices.push(yeelight);
  });
  discoveryService.listen();
  console.log('state', devices);
};
