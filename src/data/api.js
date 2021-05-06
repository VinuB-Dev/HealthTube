import { createServer, Model, RestSerializer } from "miragejs";
import { videos } from "./data";
import faker from "faker";

faker.seed(123);

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer
    },

    models: {
      video: Model
    },

    routes() {
      this.namespace = "api";
      this.timing = 1000;
      this.resource("videos");
    },

    seeds(server) {
      videos.forEach((item) => {
        server.create("video", item);
      });
    }
  });
}
