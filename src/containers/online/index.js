import React, { Component } from 'react'
import * as d3 from 'd3'
import './index.scss'

const TIME_GAP = 600000

/**
 * tickFormat 入参
 * 创造出多 tick，间隔若干 tick 加 label 的效果
 *
 * @param {Date} domain
 * @param {number} number
 */
const multiFormat = (domain, number) => {
  if (domain.getTime() % 60000 === 0) {
    return d3.timeFormat('%H:%M')(domain)
  }
}

/**
 * X
 * 每 5 秒一个 tick
 *
 * @param {*} xScale
 */
const getxAxis = (xScale) => {
  return d3.axisBottom(xScale).ticks(TIME_GAP / 5000).tickFormat(multiFormat)
}

/**
 * 获取线条
 *
 * @param {*} xScale
 * @param {*} yScale
 */
const getLine = (xScale, yScale) => {
  return d3
    .line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]))
    // .curve(d3.curveMonotoneX)
}

class Online extends Component {
  constructor() {
    super()
    this.state = {
      dataset: [
      ]
    }
    this.margin = { top: 50, right: 50, bottom: 50, left: 50 }
    this.width = 800
    this.height = 500
    this.createLineChart = this.createLineChart.bind(this)
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.tickData()
    }, 5000)
    this.createLineChart()
  }

  componentDidUpdate() {
    this.updateLineChart()
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  tickData() {
    const now = new Date()
    let data = this.state.dataset
    data.push([new Date(), Math.floor(Math.random() * 100)])
    data = data.filter((d) => {
      return d[0].getTime() > now.getTime() - TIME_GAP
    })
    this.setState({
      dataset: [...data]
    })
  }

  _getxScale() {
    const now = new Date()
    return d3
      .scaleTime()
      .domain([new Date(now.getTime() - TIME_GAP), now])
      .range([0, this.width])
  }

  _getyScale() {
    const max = d3.max(this.state.dataset, (d) => d[1]) || 100
    return d3
      .scaleLinear()
      .domain([0, max])
      .range([this.height, 0])
  }

  createLineChart() {
    const xScale = this._getxScale()
    const yScale = this._getyScale()

    const svg = d3
      .select(this.node)
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)

    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${this.height})`)
      // .call(d3.axisBottom(xScale).ticks(20).tickFormat(d3.timeFormat('%H:%M')))
      .call(getxAxis(xScale))

    svg
      .append('g')
      .attr('class', 'y axis')
      .call(d3.axisLeft(yScale))

    svg
      .append('path')
      .datum(this.state.dataset)
      .attr('class', 'line')
      .attr('d', getLine(xScale, yScale))

    // svg
    //   .selectAll('.dot')
    //   .data(dataset)
    //   .enter()
    //   .append('circle') // Uses the enter().append() method
    //   .attr('class', 'dot') // Assign a class for styling
    //   .attr('cx', (d, i) => xScale(i))
    //   .attr('cy', (d) => yScale(d.y))
    //   .attr('r', 5)
    //   .on('mouseover', function (a, b, c) {
    //     this.classList.add('focus')
    //   })
    //   .on('mouseout', function () {
    //     this.classList.remove('focus')
    //   })
  }

  updateLineChart() {
    const xScale = this._getxScale()
    const yScale = this._getyScale()

    d3
      .selectAll('g.x.axis')
      .attr('transform', `translate(0, ${this.height})`)
      // .call(d3.axisBottom(xScale).ticks(20).tickFormat(d3.timeFormat('%H:%M')))
      .call(getxAxis(xScale))

    d3
      .selectAll('g.y.axis')
      .call(d3.axisLeft(yScale))

    d3
      .select('path.line')
      .datum(this.state.dataset)
      .attr('d', getLine(xScale, yScale))
  }

  render() {
    return (
      <div className="online">
        <svg
          width={this.width + this.margin.left + this.margin.right}
          height={this.height + this.margin.top + this.margin.bottom}
          ref={node => this.node = node}
        >
        </svg>
      </div>
    )
  }
}

export default Online
