import React, { Component } from "react";
import HomePage from "@/views/dynamics/dashboard/HomePage";
import styles from "./SortElementList.module.css";
import SortableElement from "./SortableElement";
import { Container, Draggable } from "react-smooth-dnd";

/**
* Props of SortElementList Component
* @typedef Props
* @property {string} className
* @property {React.CSSProperties} style
* @property {HomePage} parent
* 
* @extends {Component<Props>}
*/
export default class SortElementList extends Component {
    
    constructor(props){
        super(props);
        //this.controller = new SortElementListController(this);
        this.state = {
            list:[1,2,3,4,5,6,7,8,9]
        }
    }
    
    componentDidMount(){
    }

    onColumnDrop=()=>{

    }
    
    render(){

        let elements = this.props.parent.state.elements;
        let total_items = elements.length;

        return(
            <div className={styles.con}>
                {
                    elements[0]?
                    <SortableElement data={elements[0]}/>:null
                }
                <Container
                    //onDragStart={this.onDragStart}
                    //onDragEnd={this.onDragEnd}
                    //lockAxis={"y"}
                    dragHandleSelector={".dragHandleSelector"}
                    onDrop={this.onColumnDrop}
                    // dropPlaceholder={{
                    //     animationDuration: 150,
                    //     showOnTop: true,
                    //     className: styles.heading_card_preview+" btc2 bgtc1"
                    // }}
                    >
                    
                    {this.props.parent.state.elements.map((item, item_index, ) => {
                        
                        if(item_index==0 || item_index == total_items-1){
                            return null;
                        }

                        return (
                        <Draggable key={item_index}>

                            <SortableElement data={item}/>

                        </Draggable>
                        );
                    })}

                    

                </Container>
                {
                    elements[total_items-1]?
                    <SortableElement data={elements[total_items-1]}/>:null
                }
            </div>
        )
    }
}