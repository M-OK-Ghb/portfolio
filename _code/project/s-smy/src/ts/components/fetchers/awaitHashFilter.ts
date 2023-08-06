import HashFilter from "../hashFilter";
import GetNewSsreportIcon from "./getNewSsreportIcon";
import GetSsreportArticle from "./getSsreportArticle";
import SetSsValues from "./setSsValues";

export class AwaitHashFilter {

  constructor () {
    console.log(`[class] - AwaitHashFilter.setup`);
    this.init()
  };

  private async init() {
    const GetSsreportArticle_Class = new GetSsreportArticle()
    const SetSsValues_class = new SetSsValues()
    await Promise.all([
      SetSsValues_class.set(),
      GetSsreportArticle_Class.getJson()
    ])
    
    // .catch(() => {
    //   // console.log("error")
    // })
    
    GetSsreportArticle_Class.getArticle(GetSsreportArticle_Class.data)
    let flgs = []
    const els = document.querySelector("#latest-topics").querySelectorAll("img")
    els.forEach((el) => {
      el.addEventListener("load", () => {
        // console.log("complate")
        flgs.push(null)
      })
    })

    const _ = () => {
      setTimeout(() => {
        if (flgs.length === els.length) {
          // console.log(flgs.length, els.length);
          new HashFilter()
        } else {
          _()
        }
      }, 1)
    }
    _()
  }
}