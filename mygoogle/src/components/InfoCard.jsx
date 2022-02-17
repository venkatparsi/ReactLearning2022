import React from 'react';
import { FaClock, FaUser,FaClipboard } from 'react-icons/fa'
import { paste, zoomIt } from '../image-utils'
import  Image  from './Image'

const InfoCard = (props) => {
  function displayImageProps(){
      var elem = document.getElementById('testImg');
      console.log(elem);

  }
    return (
        <div>
            <div class="astra-jss23">
              <div class="col-lg-11 mb-3">
                <div class="card card-gallery shadow shadow--dark h-100" >
                  <div class="card-body">
                    <div class="row mb-1">
                      <div class="col-12">                        
                          <div class="rightAlign">
                            <a href="#" title="Copy from clipboard"
                              onClick={e => { paste('image001') }}
                            >
                              <FaClipboard></FaClipboard>
                            </a>
                          </div>
                     

                        <img id="image001"
                          onClick={(e) => { zoomIt(e.target) }} //e.bind (this)}}
                          className="card-gallery--imageCover"
                          alt=""
                          src="https://raw.githubusercontent.com/DataStax-Examples/astra-netflix/master/hero.png"
                        />
                       
                         <h4>
                          <a
                            class="card-gallery--title"
                            href="#"
                          >Netflix Clone using GraphQL and Astra DB</a
                          >
                        </h4>
                        <span class="extra-small text-night-300">
                          Last Updated: Sep 14, 2021
                          <FaClock /> 2 hours
                          <FaUser /> Beginner
                        </span>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-auto">
                        <p class="small text-gray-300">
                          Let's code a Netflix Clone with GraphQL
                          Pagination!
                        </p>
                        <span class="card-gallery__tag text-default"
                        >Casandra</span
                        ><span class="card-gallery__tag text-default"
                        >javascript</span
                        ><span class="card-gallery__tag text-default"
                        >GraphQL</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <div class="row float-right">                     
                      <div class="col-auto pl-0">
                        <div class="dropdown" data-testid="">
                          <button class="btn btn-primary undefined">
                            Try Now &nbsp;<svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <polyline
                                points="6 9 12 15 18 9"
                              ></polyline>
                            </svg>
                          </button>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

        </div>
    )
}

export default InfoCard
