import React, { Component } from 'react'
import * as d3 from 'd3'

function getData() {
  const numItems = 20 + Math.floor(20 * Math.random())
  const data = []
  for(let i = 0; i < numItems; i++) {
    data.push({
      x: Math.random(),
      y: Math.random(),
      r: Math.random(),
      colour: i % 5
    })
  }
  return data
}

const colours = ['#2176ae', '#57b8ff', '#b66d0d', '#fbb13c', '#fe6847']

class Home extends Component {
  constructor() {
    super()
    this.width = 800
    this.height = 500
    this.state = {
      data: getData(),
      title: 'hehe'
    }
  }

  render() {
    let maxRadius = 40
    let xScale = d3.scaleLinear().domain([0, 1]).range([0, this.width])
    let yScale = d3.scaleLinear().domain([0, 1]).range([0, this.height])
    let rScale = d3.scaleLinear().domain([0, 1]).range([0, maxRadius])

    let points = this.state.data.map((d, index) => <circle
      key={`points_${index}`}
      cx={xScale(d.x)}
      cy={yScale(d.y)}
      r={rScale(d.r)}
      fill={colours[d.colour]} />
    )

    return (
      <div>
        <svg width={this.width} height={this.height}>{points}</svg>
      </div>
    )
  }
}

export default Home
