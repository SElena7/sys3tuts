
import React from 'react'
import axios from 'axios'

class NovicaView extends React.Component {

    constructor(props){
        super(props)
        this.state={
            novice:[]
        }
    }

    QSetViewInParent= (obj) => {

        this.props.QIDFromChild(obj);

    }

    componentDidMount() {
        axios.get("http://88.200.63.148:8115/novice")
            .then(res => {
                this.setState({
                    novice: res.data
                });
            })
            .catch(err => {
                if (err) {
                    console.log("Error: " + err.message);
                }
            });
    }
    
    render() {
        console.log(this.state.novice)
        let data = this.state.novice
        return (

            <div className="row row-cols-1 row-cols-md-3 g-4" style={{ margin: "10px" }}>
                {data.length > 0 ? 
                data.map(d=>{
                    return(
                        <div className="col" key={d.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{d.title}</h5>
                                    <p className="card-text">{d.slug}</p>
                                </div>
                                <button onClick={() => this.QSetViewInParent({ page: "singlenews", id: d.id })} style={{ margin: "10px" }} className="btn btn-primary bt">Read more</button>
                            </div>
                        </div>

                    )
                })
                :
                "Loading"}
            </div>
        )
    }
}

export default NovicaView




