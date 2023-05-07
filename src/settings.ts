import { DisplayName } from "identification/display-name";

const ExtensionUtils = imports.misc.extensionUtils;

export const SettingsPath =
  "org.gnome.shell.extensions.quicksettings-audio-devices-hider";

export const ExcludedOutputNamesSetting = "excluded-output-names";
const AvailableOutputNames = "available-output-names";

export class SettingsUtils {
  // static getExcludedOutputDeviceIds(): number[] {
  //     const settings = ExtensionUtils.getSettings(SettingsPath);
  //     const ids = settings.get_strv(ExcludedOutputIdsSetting);

  //     return ids.map(id => parseInt(id));
  // }

  // static setExcludedOutputDeviceIds(ids: number[]) {
  //     const settings = ExtensionUtils.getSettings(SettingsPath);
  //     settings.set_strv(ExcludedOutputIdsSetting, ids.map(id => id.toString()));
  // }

  static getExcludedOutputDeviceNames(): DisplayName[] {
    const settings = ExtensionUtils.getSettings(SettingsPath);
    const ids = settings.get_strv(ExcludedOutputNamesSetting);

    return ids;
  }

  static setExcludedOutputDeviceNames(displayNames: DisplayName[]) {
    const settings = ExtensionUtils.getSettings(SettingsPath);
    settings.set_strv(ExcludedOutputNamesSetting, displayNames);
  }

  static addToExcludedOutputDeviceNames(displayName: DisplayName) {
    const currentOutputs = SettingsUtils.getExcludedOutputDeviceNames();

    if (currentOutputs.includes(displayName)) {
      return;
    }

    const newOutputs = [...currentOutputs, displayName];

    const settings = ExtensionUtils.getSettings(SettingsPath);

    log("Setting " + newOutputs);

    settings.set_strv(ExcludedOutputNamesSetting, newOutputs);
  }

  static removeFromExcludedOutputDeviceNames(displayName: DisplayName) {
    const outputs = SettingsUtils.getExcludedOutputDeviceNames();

    const index = outputs.indexOf(displayName);

    if (index === -1) {
      return;
    }

    outputs.splice(index, 1);

    const settings = ExtensionUtils.getSettings(SettingsPath);
    settings.set_strv(ExcludedOutputNamesSetting, outputs);
  }

  static getAvailableOutputs(): DisplayName[] {
    const settings = ExtensionUtils.getSettings(SettingsPath);
    const ids = settings.get_strv(AvailableOutputNames);

    return ids;
  }

  static setAvailableOutputs(displayNames: DisplayName[]) {
    const settings = ExtensionUtils.getSettings(SettingsPath);
    settings.set_strv(
      AvailableOutputNames,
      displayNames.map((id) => id.toString())
    );
  }

  static addToAvailableOutputs(displayName: DisplayName) {
    const currentOutputs = SettingsUtils.getAvailableOutputs();

    if (currentOutputs.includes(displayName)) {
      return;
    }

    const newAllOutputs = [...currentOutputs, displayName];

    const settings = ExtensionUtils.getSettings(SettingsPath);
    settings.set_strv(
      AvailableOutputNames,
      newAllOutputs.map((id) => id.toString())
    );
  }

  static removeFromAvailableOutputs(displayName: DisplayName) {
    const outputs = SettingsUtils.getAvailableOutputs();

    const index = outputs.indexOf(displayName);

    if (index === -1) {
      return;
    }

    outputs.splice(index, 1);

    const settings = ExtensionUtils.getSettings(SettingsPath);
    settings.set_strv(
      AvailableOutputNames,
      outputs.map((id) => id.toString())
    );
  }
}
