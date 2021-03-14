import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
        const rows = Object.entries(this.props.emotions).map(([key,value])=>
        <tr key={key}>
            <td>{key}</td>
            <td>{value}</td>
        </tr>
        );

        return (  
        <div>
          <table className="table table-bordered">
            <tbody>
                {rows}
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
