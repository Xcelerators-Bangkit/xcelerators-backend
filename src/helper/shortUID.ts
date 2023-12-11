import { ytid } from "ytid";

function shortUID(n: number) {
  return ytid();
}

export default shortUID;