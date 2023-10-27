import { paths } from "@/utils/paths";
import { Path } from "./Path";

export class Status {
  isOn: boolean;
  path: Path;
  constructor(isOn: boolean, path: Path) {
    this.isOn = isOn;
    this.path = path;
  }
}

typeof paths.values;
