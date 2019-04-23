import React, { Component } from 'react'

export default class Table extends Component {
    render() {
        return (
            <table>
                <tbody>
                    {Array(parseInt(this.props.rows)).fill().map((v, row)=>{
                        return (
                            <tr key={`tr-${row}`} {...this.props.trProps}>
                                {Array(parseInt(this.props.cols)).fill().map((v, col)=>{
                                    return (
                                        <td key={`td-${row}-${col}`} onClick={()=>this.props.onClick(row, col)}>
                                            {this.props.render(row, col)}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}

export class TableTest extends Component {
	render() {
		return (
            <Table
                rows='10'
                cols='10'
                render={(r, c) => {
                    return r + ' ' + c
                }}
                onClick={(r, c)=>{
                    alert(r+" "+c)
                }}
            />
		)
	}
}

