export interface ApsBom {
  bomCode: string
  bomName: string
  bomCostPrice: string
  bomCostPriceUnit: string
  bomInventory: string
  groupId: string
  supplyMode: string
  useUnit: string
  bomUnit: string
  produceProcessId: string
  deliveryCycleDay: string
  apsBomSupplierId: string
  id: string
}

export interface supplyModeType {
  label: string
  value: string
}

export const supplyModeList: supplyModeType[] = [{
  value: "make",
  label: "制造"
}, {
  label: "购买",
  value: "buy"
}]
