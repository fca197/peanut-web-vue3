import {
  ApsMachineWorkstationItem
} from "@v/aps/ApsMachineWorkstationItem/ApsMachineWorkstationItemType.ts";

export interface ApsMachineWorkstation {
  machineWorkstationNo?: string | undefined
  machineWorkstationName?: string | undefined
  minPower?: string | undefined
  maxPower?: string | undefined
  factoryId?: string | undefined
  sortIndex?: number | undefined
  id?: string | undefined
  machineWorkstationItemDtoList?: ApsMachineWorkstationItem []
}
