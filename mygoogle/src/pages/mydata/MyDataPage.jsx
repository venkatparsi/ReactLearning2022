import React from 'react'
import './mydata.style.css'
import Card from '../../components/card/card.component'

const MyDataPage = (props) => {
    console.log("MyData page PROPS DATA",props)
    return (
        <section className="Show__Section">
          <div className="SearchBox">SEARCH
             <h2 class="Headings__Styled">All Articles</h2>
          </div>
         
  



         <div className="ArticleGallery_Wrapper">
                <div className='ArticleGallery_Grid'>
                <ul className='ArticleCards_Wrapper'>
                    <li className="ArticleCard_Wrapper">
                    <Card />
                    </li>
                    <li className="ArticleCard_Wrapper">

                    
                    </li>
                    <li className="ArticleCard_Wrapper">

                  
                    </li>


                </ul>
                

            </div>




              
               </div>
        </section>
       
    )
}

export default MyDataPage
