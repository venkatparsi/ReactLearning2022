import React, { useContext, useState } from "react";
import { NavItem, NavLink, Tooltip } from 'reactstrap';
import {TabsContext} from './TabsContext';
import classnames from "classnames";

const Tablink =
    ({ title, tabId, tooltip, activeTab, isClosable }) => {
        const [tooltipOpen, setTooltipOpen] = useState(false);
        const context = useContext(TabsContext);
        const toggle = () => setTooltipOpen(!tooltipOpen);
        const closeTab = (e) => {
            context.onTabClose(e, tabId);
        }
        const tabLinkId = `tab${tabId}`;

        return (
            <NavItem key={tabId}>
                <NavLink 
                    className={classnames({active:activeTab === tabId})}
                    onClick={()=> context.onTabSelect(tabId)}
                    >
                        <div className="d-flex w-100 h-auto">
                            <div 
                                id={tabLinkId}
                                className="text-wrap-ellipsis"
                                style={{width: '150px'}}
                               >
                                {title}
                                <Tooltip
                                  placement="top"
                                  isOpen={tooltipOpen}
                                  autohide={false}
                                  target={tabLinkId}
                                  toggle={toggle}
                                  >
                                    {tooltip}
                                  </Tooltip>
                            </div>                           
                        </div>
                        {isClosable && (
                            <button 
                                id='close-btn'
                                className={classnames(
                                    'd-inline-block',
                                    'btn',
                                    'btn-secondary',
                                    'bnt-round',
                                    'bnt-xs',
                                    'float-right',
                                    'nav-tab-cross-btn'
                                )}
                                onClick={closeTab}>  
                                <i className="pe-7s-close" />                                  
                            </button>
                        )}
                    </NavLink>
            </NavItem>
        );
    };
    export default Tablink;