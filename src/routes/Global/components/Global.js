import React from 'react'

export default class Global extends React.Component{
    render(){
        var styles = {
            alignment: {
                textAlign: 'left' 
            },
            borders: {
                border:1,
                borderStyle:'solid',
                borderColor:'gray',
                borderRadius:5,
                marginTop: 20

            }
        }
        return (
            <div>
                <div className="row">
                    <h4>Étudiants potentiellement en situation de plagiat</h4>      
                </div>
                <div className="row">
                    <div className="col-lg-6" style={styles.borders}> 
                        <ul className="list-unstyled" style={styles.alignment}>
                        <li><a href="#">Personne A</a></li>
                        <li><a href="#">Personne B</a></li> 
                        <li><a href="#">Personne C</a></li>
                        <li><a href="#">Personne D</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
