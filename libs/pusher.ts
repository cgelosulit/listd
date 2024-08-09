import { Pusher } from "@pusher/pusher-websocket-react-native";

const pusher = Pusher.getInstance();

export async function initializePusher(apiKey: string, apiCluster: string) {
  await pusher.init({
    apiKey,
    cluster: apiCluster,
  });

  await pusher.connect();
}

export default pusher;