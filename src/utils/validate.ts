import {isEmpty} from '../../utils'
import CONSTANT from '../constant/Constant'

export default class Validate {
  public static validateAdvertisingIdentifier(
    isAdEnabled: boolean,
    adid: string | null,
  ): {isAdEnabled: boolean; adid: string} {
    if (isEmpty(adid) || adid === CONSTANT.DEFAULT_ADID) {
      console.log(
        `AdvertisingIdentifier empty or all zero::isAdEnabled: ${isAdEnabled}, >>${adid}<<`,
      )
      isAdEnabled = false
      adid = CONSTANT.DEFAULT_ADID
    } else {
      adid = adid ?? CONSTANT.DEFAULT_ADID
    }

    return {
      isAdEnabled,
      adid,
    }
  }
}
