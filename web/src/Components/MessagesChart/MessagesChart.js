/**
 * @file MessagesChart
 * @copyright Copyright (c) 2018-2022 Dylan Miller and icpexplorer contributors
 * @license MIT License
 */

import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import axios from 'axios';
import BarChart from '../BarChart/BarChart';
import Constants from '../../constants';
import roundDownDateToHour from '../../utils/roundDownDateToHour';

/**
 * This component displays a number of messages chart with data retrieved from
 * ic-api.internetcomputer.org.
 */
class MessagesChart extends BarChart { 
  static propTypes = {
    /**
     * The current Breakpoint, taking the desktop drawer (large screens) width into account.
     */    
    breakpoint: PropTypes.number.isRequired,
    /**
     * The height of the chart (not including the title).
     */
    chartHeight: PropTypes.number.isRequired,
    /**
     * The styled-components theme.
     */
    theme: PropTypes.object.isRequired
  };
  
  /**
   * Create a MessagesChart object.
   * @constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      messagesData: [],
      prevDate: null,
      error: false
    };
  }
  
  /**
   * Invoked by React immediately after a component is mounted (inserted into the tree). 
   * @public
   */
  /*fastchart!!!componentDidMount() {    
    // Update the messages data using intervals.
    this.pollForInitialMessages();
    this.interval = setInterval(
      () => { this.pollForMoreMessages() },
      Constants.MESSAGES_CHART_POLL_INTERVAL_MS);
  }*/

  /**
   * Invoked by React immediately before a component is unmounted and destroyed.
   * @public
   */
  /*fastchart!!!componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }*/
  
  /**
   * Invoked by React immediately after a component is mounted (inserted into the tree). 
   * @public
   */
  componentDidMount() {
    // Get 24 hours of hourly data. Daily data does not currently work, because
    // ic-api.internetcomputer.org returns glitchy data for some days within past week.
    const endDate = roundDownDateToHour(new Date());
    const startDate = new Date(endDate.getTime());
    startDate.setDate(endDate.getDate() - 1);
    const secondsInHour = 60 * 60;
    const url =
      `https://ic-api.internetcomputer.org/api/v3/messages-counts-over-time-deprecated?&start=${Math.floor(startDate.getTime() / 1000)}&end=${Math.floor(endDate.getTime() / 1000)}&step=${secondsInHour}`;
    axios.get(url)
      .then(res => {
        let values = res.data.messages_count;

        // Use values[0] to get the starting number of messages.
        let prevTotal = Math.floor(values[0][1]);
        const messagesData = values.slice(1).map((value) => {
          const date = new Date(value[0] * 1000);
          const total = Math.floor(value[1]);
          const numMessages = Math.max(total - prevTotal, 0);
          prevTotal = total;
          return {date: date.getTime(), numMessages: numMessages};
        });
        this.setState({
          messagesData: messagesData
        });
      })
      .catch(() => {
        this.setState({
          error: true
        });
      });
  }

  /**
   * Return the title of the chart.
   * @return {String} The title of the chart.
   * @protected
   */
  getTitle() {
    const { error } = this.state;
    let title = 'Messages';
    if (error)
      title += ' - Network Error'
    return title;
  }

  /**
   * Return an array of objects that describe the chart data.
   * @return {Array} An array of objects that describe the chart data.
   * @protected
   */
  getData() {
    const { messagesData } = this.state;
    return messagesData;
  }

  /**
   * Return the key of the data to be displayed in the x-axis.
   * @return {String} The key of the data to be displayed in the x-axis.
   * @protected
   */
  getDataKeyX() {
    return 'date';
  }

  /**
   * Return the key of the data to be displayed in the y-axis.
   * @return {String} The key of the data to be displayed in the y-axis.
   * @protected
   */
  getDataKeyY() {
    return 'numMessages';
  }

  /**
   * Return a string for the x-axis tick label corresponding to the specified value.
   * @param {Any} value The value of the data.
   * @return {String} The string for the x-axis tick label.
   * @protected
   */
  getGetTickX(value) {
    return new Date(value).toLocaleTimeString('default', { hour: 'numeric', minute: '2-digit' });
    //fastchart!!!return new Date(value).toLocaleTimeString();
  }

  /**
   * Return a string for the y-axis tick label corresponding to the specified value.
   * @param {Any} value The value of the data.
   * @return {String} The string for the y-axis tick label.
   * @protected
   */
  getGetTickY(value) {
    if (value >= 1000) {
      const k = value / 1000;
      return k.toFixed(Number.isInteger(k) ? 0 : 1) + 'k';
    }
    else
      return value;
  }

  /**
   * Return a string for the x-axis tooltip label corresponding to the specified value.
   * @param {Any} value The value of the data.
   * @return {String} The string for the x-axis tooltip label.
   * @protected
   */
  getGetTooltipX(value) {
    return new Date(value).toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' });
    //fastchart!!!return new Date(value).toLocaleTimeString();
  }

  /**
   * Return a string for the y-axis tooltip label corresponding to the specified value.
   * @param {Any} value The value of the data.
   * @return {String} The string for the y-axis tooltip label.
   * @protected
   */
  getGetTooltipY(value) {
    return `New Messages: ${value.toLocaleString()}`;
  }
  /**
   * Return The duration of the chart animation.
   * @param {Any} value The value of the data.
   * @protected
   */
  /*fastchart!!!getAnimationDuration() {
    return 0;
  }*/

  /**
   * Poll for the initial messages.
   * @private
   */
  /*fastchart!!!pollForInitialMessages() {
    let endDate = new Date();
    endDate = new Date(endDate.getTime() - 1 * 60000); // 1 minute ago to avoid API time discrepancy
    const startDate = new Date(endDate.getTime() - 2 * 60000); // 2 minutes ago
    const seconds = Constants.MESSAGES_CHART_POLL_INTERVAL_MS / 1000;
    const url =
      `https://ic-api.internetcomputer.org/api/v3/messages-counts-over-time-deprecated?&start=${Math.floor(startDate.getTime() / 1000)}&end=${Math.floor(endDate.getTime() / 1000)}&step=${seconds}`;
    axios.get(url)
      .then(res => {
        let values = res.data.messages_count;
        // Use values[0] to get the starting number of messages.
        let prevHeight = Math.floor(values[0][1]);
        const messagesData = values.slice(1).map((value) => {
          const date = new Date(value[0] * 1000);
          const height = Math.floor(value[1]);
          const numMessages = Math.max(height - prevHeight, 0);
          prevHeight = height;
          return {date: date.getTime(), numMessages: numMessages};
        });
        this.setState({
          messagesData: messagesData,
          prevDate: endDate
        });
      })
      .catch(() => {
        this.setState({
          error: true
        });
      });
  }*/

  /**
   * Poll for more messages.
   * @private
   */
  /*fastchart!!!pollForMoreMessages() {
    const { prevDate } = this.state;
    let endDate = new Date();
    endDate = new Date(endDate.getTime() - 1 * 60000); // 1 minute ago to avoid API time discrepancy
    const startDate = prevDate;
    const seconds = 1;
    const url =
      `https://ic-api.internetcomputer.org/api/v3/messages-counts-over-time-deprecated?&start=${Math.floor(startDate.getTime() / 1000)}&end=${Math.floor(endDate.getTime() / 1000)}&step=${seconds}`;
    axios.get(url)
      .then(res => {
        const values = res.data.messages_count;
        if (values.length >= 0) {
          const prevHeight = Math.floor(values[0][1]);
          const curHeight = Math.floor(values[values.length - 1][1]);
          const date = new Date(values[values.length - 1][0] * 1000);
          const numMessages = Math.max(curHeight - prevHeight, 0);
          const messages = {date: date.getTime(), numMessages: numMessages};
          this.setState(prevState => ({
            messagesData: prevState.messagesData.slice(1).concat(messages),
            prevDate: endDate
          }));  
        }
      })
      .catch(() => {
        this.setState({
          error: true
        });
      });
  }*/
}

// Use the withTheme HOC so that we can use the current theme outside styled components.
export default withTheme(MessagesChart);
