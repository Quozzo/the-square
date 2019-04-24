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
                                        <td key={`td-${row}-${col}`} onClick={()=>this.props.onClick(col, row)}>
                                            {this.props.render(col, row)}
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
                render={(c, r) => {
                    return c + ' ' + r
                }}
                onClick={(c, r)=>{
                    alert(c+" "+r)
                }}
            />
		)
	}
}

