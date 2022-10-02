import React, {useContext} from 'react'
import SearchState from '../../context/search/SearchContext'
import Loading from './loading.gif'
const Report = () => {
    const {report} = useContext(SearchState)
    let newreport = null
    // console.log(Object.keys(report).length)
    if(Object.keys(report).length > 1){
        newreport = report
    }
 
    return (
        <>
            {
                newreport ? (
                    <div className="report">
                        <div className="report__item">
                            <h4 className="report__amount">{newreport && newreport.performance._score}<span>%</span> </h4>
                            <h3 className="report__heading">{newreport && newreport.performance.title}</h3>
                        </div>
                        <div className="report__item">
                            <h4 className="report__amount" >{newreport && newreport.accessibility._score}  <span>%</span> </h4>
                            <h3 className="report__heading">{newreport && newreport.accessibility.title}</h3>
                        </div>
                        <div className="report__item">
                            <h4 className="report__amount" >{newreport && newreport.seo._score}  <span>%</span> </h4>
                            <h3 className="report__heading">{newreport && newreport.seo.title}</h3>
                        </div>
                        <div className="report__item">
                            <h4 className="report__amount" >{newreport && newreport.pwa._score}  <span>%</span> </h4>
                            <h3 className="report__heading">{newreport && newreport.pwa.title}</h3>
                        </div>
                    </div>
                
                ) : (

                    <div className="report">
                        <div className="report__item">
                            <h4 className="report__amount" ><img width="30" src={Loading} alt="..."/></h4>
                            <h3 className="report__heading">performance</h3>
                        </div>
                        <div className="report__item">
                            <h4 className="report__amount" ><img width="30" src={Loading} alt="..."/></h4>
                            <h3 className="report__heading">accessibility</h3>
                        </div>
                        <div className="report__item">
                            <h4 className="report__amount" ><img width="30" src={Loading} alt="..."/></h4>
                            <h3 className="report__heading">seo</h3>
                        </div>
                        <div className="report__item">
                            <h4 className="report__amount" ><img width="30" src={Loading} alt="..."/></h4>
                            <h3 className="report__heading">pwa</h3>
                        </div>
                    </div>
                )
            }
        </>  
    )
}

export default Report
