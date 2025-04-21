export interface ApsSaleConfig {
  saleCode: string | undefined
  saleName: string | undefined
  supplierStatus: string | undefined
  isValue: number | undefined
  parentId: string | undefined
  id: string | undefined
  children: ApsSaleConfig []
}
