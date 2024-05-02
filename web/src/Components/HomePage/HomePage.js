/**
 * @file HomePage
 * @copyright Copyright (c) 2018-2022 Dylan Miller and icpexplorer contributors
 * @license MIT License
 */

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { duration, easing } from '@material-ui/core/styles/transitions';
import Fade from 'react-reveal/Fade';
import TrackablePage from '../TrackablePage/TrackablePage'
import BlocksCard from '../BlocksCard/BlocksCard';
import BlockTimeCard from '../BlockTimeCard/BlockTimeCard';
import MessagesCard from '../MessagesCard/MessagesCard';
//pricing!!!import PriceCard from '../PriceCard/PriceCard';
import IcpMetricsTable from '../IcpMetricsTable/IcpMetricsTable';
import NetworkMetricsTable from '../NetworkMetricsTable/NetworkMetricsTable';
import BlocksChart from '../BlocksChart/BlocksChart';
import CanistersChart from '../CanistersChart/CanistersChart';
//pricing!!!import PriceChart from '../PriceChart/PriceChart';
import StakedChart from '../StakedChart/StakedChart';
import { Breakpoints } from '../../utils/breakpoint';
import Constants from '../../constants';
import { Fragment } from "react";

const GridSection = styled(Grid)`
  && {
    padding-left: ${Constants.HOME_PAGE_MARGIN_SM_AND_UP + 'px'};
    padding-right: ${Constants.HOME_PAGE_MARGIN_SM_AND_UP + 'px'};
    transition: ${'padding ' + duration.standard + 'ms ' + easing.easeInOut};
    ${({ breakpoint }) =>
      breakpoint === Breakpoints.XS && `
        padding-left: ${Constants.HOME_PAGE_MARGIN_XS + 'px'};
        padding-right: ${Constants.HOME_PAGE_MARGIN_XS + 'px'};
      `
    }
  }
`;

const GridSectionCharts2 = styled(GridSection)`
  && {
    padding-bottom: ${Constants.HOME_PAGE_MARGIN_SM_AND_UP + 'px'};
  }
`;

const GridCard = styled(Grid)`
  && {
    padding-top: ${Constants.HOME_PAGE_MARGIN_SM_AND_UP + 'px'};
    /*pricing!!!${({ breakpoint }) =>
      ((breakpoint === Breakpoints.XL || breakpoint === Breakpoints.LG) && `
        width: calc(25% - ${Constants.HOME_PAGE_MARGIN_SM_AND_UP*3/4 + 'px'});
      `) ||
      (breakpoint === Breakpoints.MD && `
        width: calc(50% - ${Constants.HOME_PAGE_MARGIN_SM_AND_UP/2 + 'px'});
      `) ||
      (breakpoint === Breakpoints.SM && `
        width: 100%;
      `) ||
      (breakpoint === Breakpoints.XS && `
        padding-top: ${Constants.HOME_PAGE_MARGIN_XS + 'px'};
        width: 100%;
      `)
    }*/
    //pricing!!!
    ${({ breakpoint }) =>
      ((breakpoint === Breakpoints.XL || breakpoint === Breakpoints.LG ||
        breakpoint === Breakpoints.MD) && `
        width: calc(33.33% - ${Constants.HOME_PAGE_MARGIN_SM_AND_UP*2/3 + 'px'});
      `) ||
      (breakpoint === Breakpoints.MD && `
        width: calc(50% - ${Constants.HOME_PAGE_MARGIN_SM_AND_UP/2 + 'px'});
      `) ||
      (breakpoint === Breakpoints.SM && `
        width: 100%;
      `) ||
      (breakpoint === Breakpoints.XS && `
        padding-top: ${Constants.HOME_PAGE_MARGIN_XS + 'px'};
        width: 100%;
      `)
    }
  }
`;

const DivTable = styled.div`
  && {
    display: flex;
    flex-direction: column;
    padding-top: ${Constants.HOME_PAGE_MARGIN_SM_AND_UP + 'px'};
    ${({ breakpoint }) =>
      ((breakpoint === Breakpoints.XL || breakpoint === Breakpoints.LG || breakpoint === Breakpoints.MD) && `
        width: calc(50% - ${Constants.HOME_PAGE_MARGIN_SM_AND_UP/2 + 'px'});
      `) ||
      ((breakpoint === Breakpoints.SM || breakpoint === Breakpoints.XS) && `
        width: 100%;
      `)
    }
  }
`;

const GridTable = styled(Grid)`
  && {
    /* Obsolete, keep for now.
    padding-top: ${Constants.HOME_PAGE_MARGIN_SM_AND_UP + 'px'};
    ${({ breakpoint }) =>
      ((breakpoint === Breakpoints.XL || breakpoint === Breakpoints.LG || breakpoint === Breakpoints.MD) && `
        width: calc(50% - ${Constants.HOME_PAGE_MARGIN_SM_AND_UP/2 + 'px'});
      `) ||
      ((breakpoint === Breakpoints.SM || breakpoint === Breakpoints.XS) && `
        width: 100%;
      `)
    }*/
  }
`;

const GridTable2 = styled(GridTable)`
  && {
    padding-top: ${Constants.HOME_PAGE_MARGIN_XS + 'px'};
    /* Obsolete, keep for now.
    ${({ breakpoint }) =>
      ((breakpoint === Breakpoints.XS) && `
        padding-top: ${Constants.HOME_PAGE_MARGIN_XS + 'px'};
      `)
    }*/
  }
`;

const GridChart = styled(Grid)`
  && {
    padding-top: ${Constants.HOME_PAGE_MARGIN_SM_AND_UP + 'px'};
    ${({ breakpoint }) =>
      ((breakpoint === Breakpoints.XL || breakpoint === Breakpoints.LG || breakpoint === Breakpoints.MD) && `
        width: calc(50% - ${Constants.HOME_PAGE_MARGIN_SM_AND_UP/2 + 'px'});
      `) ||
      ((breakpoint === Breakpoints.SM || breakpoint === Breakpoints.XS) && `
        width: 100%;
      `)
    }
  }
`;

//pricing!!!
const GridChartWide = styled(Grid)`
  && {
    padding-top: ${Constants.HOME_PAGE_MARGIN_SM_AND_UP + 'px'};
    width: 100%;
  }
`;

const CardBlocks = styled(BlocksCard)`
  && {
    background: ${props => props.theme.colorDashCardBackground};
    color: ${props => props.theme.colorBodyText};
  }
`;

const CardBlockTime = styled(BlockTimeCard)`
  && {
    background: ${props => props.theme.colorDashCardBackground};
    color: ${props => props.theme.colorBodyText};
  }
`;

const CardMessages = styled(MessagesCard)`
  && {
    background: ${props => props.theme.colorDashCardBackground};
    color: ${props => props.theme.colorBodyText};
  }
`;

/*pricing!!!const CardPrice = styled(PriceCard)`
  && {
    background: ${props => props.theme.colorDashCardBackground};
    color: ${props => props.theme.colorBodyText};
  }
`;*/

const TableIcpMetrics = styled(IcpMetricsTable)`
  && {
    background: ${props => props.theme.colorTableBackgroundPrimary};
  }
`;

const TableNetworkMetrics = styled(NetworkMetricsTable)`
  && {
    background: ${props => props.theme.colorTableBackgroundPrimary};
  }
`;

const ChartStaked = styled(StakedChart)`
  && {
    background: ${props => props.theme.colorDataCentersCardBackground};
  }
`;

/**
 * Component for the home page.
 */
class HomePage extends TrackablePage {
  static propTypes = {
    /**
     * The current Breakpoint, taking the desktop drawer (large screens) width into account.
     */    
    breakpoint: PropTypes.number.isRequired
  };

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    return (
      <div>
        {this.getSectionCards()}
        {this.getSectionTables()}
        {this.getSectionCharts()}
      </div>
    );
  }

  /**
   * Return the elements for the Cards section based on the current breakpoint.
   * @return {Object} The elements for the Cards section based on the current breakpoint.
   * @private
   */
  getSectionCards()
  {
    const { breakpoint } = this.props;

    return (
      <GridSection container
        direction='row'
        justify='space-between'
        alignItems='flex-start'
        breakpoint={breakpoint}
      >
        <GridCard item breakpoint={breakpoint}>
          <Fade
            timeout={500}
          >
            <CardBlocks cardIndex={0} />
          </Fade>
        </GridCard>
        <GridCard item breakpoint={breakpoint}>
          <Fade
            delay={50}
            timeout={500}
          >
            <CardBlockTime cardIndex={1} />
          </Fade>
        </GridCard>
        <GridCard item breakpoint={breakpoint}>
          <Fade
            delay={100}
            timeout={500}
          >
            <CardMessages cardIndex={2} />
          </Fade>
        </GridCard>
        {/*pricing!!!<GridCard item breakpoint={breakpoint}>
          <Fade
            delay={150}
            timeout={500}
          >
            <CardPrice cardIndex={3} />
          </Fade>
        </GridCard>*/}
      </GridSection>
    );
  }

  /**
   * Return the elements for the Tables section based on the current breakpoint.
   * @return {Object} The elements for the Tables section based on the current breakpoint.
   * @private
   */
  getSectionTables() {
    const { breakpoint } = this.props;

    return (
      <GridSection container
        direction='row'
        justify='space-between'
        alignItems='flex-start'
        breakpoint={breakpoint}
      >
        <DivTable breakpoint={breakpoint}>
          <GridTable item breakpoint={breakpoint}>
            <Fade
              timeout={500}
            >
              <TableIcpMetrics breakpoint={breakpoint} />
            </Fade>
          </GridTable>
          <GridTable2 item breakpoint={breakpoint}>
            <Fade
              delay={50}
              timeout={500}
            >
              <TableNetworkMetrics breakpoint={breakpoint} />
            </Fade>
          </GridTable2>
        </DivTable>
        <GridChart item breakpoint={breakpoint}>
          <Fade
            delay={100}
            timeout={500}
          >
            <ChartStaked
              breakpoint={breakpoint}
              chartHeight={Constants.HOME_PAGE_STAKED_ICP_CHART_HEIGHT}
              label={true}
            />
          </Fade>
        </GridChart>
      </GridSection>
    );
  }

  /**
   * Return the elements for the Charts section based on the current breakpoint.
   * @return {Object} The elements for the Charts section based on the current breakpoint.
   * @private
   */
  getSectionCharts()
  {
    const { breakpoint } = this.props;

    const chartHeight = 352;
    return (
      <Fragment>
        <GridSection container
          direction='row'
          justify='space-between'
          alignItems='flex-start'
          breakpoint={breakpoint}
        >
          {/*pricing!!! GridChart -> GridChartWide*/}
          <GridChartWide item breakpoint={breakpoint}>
            <Fade
              timeout={500}
            >
              <BlocksChart chartHeight={chartHeight} breakpoint={breakpoint} />
            </Fade>
          </GridChartWide>
          {/*pricing!!!<GridChart item breakpoint={breakpoint}>
            <Fade
              delay={50}
              timeout={500}
            >
              <PriceChart chartHeight={chartHeight} breakpoint={breakpoint} />
            </Fade>
          </GridChart>*/}
        </GridSection>
        <GridSectionCharts2 container
          direction='row'
          justify='space-between'
          alignItems='flex-start'
          breakpoint={breakpoint}
        >
          <GridChartWide item breakpoint={breakpoint}>
            <Fade
              timeout={500}
            >
              <CanistersChart chartHeight={chartHeight} breakpoint={breakpoint} />
            </Fade>
          </GridChartWide>
          {/* MessagesChart has been deprecated.
          <GridChart item breakpoint={breakpoint}>
            <Fade
              delay={50}
              timeout={500}
            >
              <MessagesChart chartHeight={chartHeight} breakpoint={breakpoint} />
            </Fade>
          </GridChart>
          */}
        </GridSectionCharts2>
      </Fragment>
    );
  }
}

export default HomePage;
