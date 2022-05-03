import React, { Component } from "react";
import HomePage from "@/views/dynamics/dashboard/HomePage";
import styles from "./SortElementList.module.css";
import SortableElement from "./SortableElement";
import { Container, Draggable } from "react-smooth-dnd";
import { sortElementsBasedOnHierarchy } from "@/controllers/dynamics/dashboard/HomePageController";

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
        }
    }
    
    componentDidMount(){
    }

    getCardPayload=(index)=>{
        let p = this.props.parent;
        let ps = p.state;
        return ps.new_hierarchy[index];
    }

    onColumnDrop=(dropResult)=>{
        
        let p = this.props.parent;
        let ps = p.state;
        let new_h = Object.assign([], ps.new_hierarchy);
        let intro_key = new_h.shift();
        let footer_key = new_h.pop();
        new_h = applyDrag(new_h, dropResult);
        new_h.unshift(intro_key);
        new_h.push(footer_key);
        ps.new_hierarchy = new_h;
        ps.new_elements = sortElementsBasedOnHierarchy(ps.new_elements, new_h);
        p.setState(ps);
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
                    getChildPayload={this.getCardPayload}
                    onDrop={this.onColumnDrop}
                    // dropPlaceholder={{
                    //     animationDuration: 150,
                    //     showOnTop: true,
                    //     className: styles.heading_card_preview+" btc2 bgtc1"
                    // }}
                    >
                    
                    {this.props.parent.state.new_elements.map((item, item_index) => {
                        
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

const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;
  
    const result = [...arr];
    let itemToAdd = payload;
  
    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }
  
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }
  
    return result;
};