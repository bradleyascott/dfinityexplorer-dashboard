/**
 * @file DEAppBar
 * @copyright Copyright (c) 2018-2022 Dylan Miller, Todd Kitchens, and icpexplorer contributors
 * @license MIT License
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import {
  AppBar,
  Divider,
  Drawer,
  Fade,
  Grid,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  SwipeableDrawer,
  SvgIcon,
  Toolbar,
  Typography,
  Zoom
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import zIndex from '@material-ui/core/styles/zIndex';
import CloseIcon from '@material-ui/icons/Close';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import RevealFade from 'react-reveal/Fade';
import RevealZoom from 'react-reveal/Zoom';
import Downshift from 'downshift';
import ResponsiveComponent from '../ResponsiveComponent/ResponsiveComponent'
import {
  Breakpoints,
  getBreakpoint,
  isBreakpointLessOrEqualTo,
  isBreakpointDesktop
} from '../../utils/breakpoint';
import Constants from '../../constants';
import icpExplorerLogo from './dfinity-explorer-logo.png';

const StyledAppBar = styled(AppBar)`
  && {
    background: ${props => props.theme.colorAppBarBackground};
    /* AppBar is above Drawer */
    z-index: ${zIndex.drawer + 1};
  }
`;

const SearchAppBar = styled(AppBar)`
  && {
    background: white;
    /* AppBar is above Drawer */
    z-index: ${zIndex.drawer + 1};
  }
`;

const StyledToolbar = styled(Toolbar)`
  && {
    padding-left: 12px;
    padding-right: 12px;
    ${({ breakpoint }) =>
      breakpoint === Breakpoints.XS && `
        padding-left: 4px;
        padding-right: 4px;
      `
    }
  }
`;

const SearchToolbar = styled(Toolbar)`
  && {
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 16px;
    padding-right: 12px;
    ${({ breakpoint }) =>
      breakpoint === Breakpoints.XS && `
        padding-top: 4px;
        padding-bottom: 4px;
        padding-left: 8px;
        padding-right: 4px;
      `
    }
  }
`;

const ImgProductIcon = styled.img`
  && {
    margin-left: 12px;
    ${({ breakpoint }) =>
      breakpoint === Breakpoints.XS && `
        margin-left: 0px;
      `
    }
  }
`;

// Specify font-size in px rather than rem for app name, since it should not change based on browser
// settings.
const TypographyAppName = styled(Typography)`
  && {
    margin-top: 1px;
    font-family: 'Istok Web', sans-serif;
    font-weight: bold;
    font-size: 20px;
    user-select: none;
    ${({ breakpoint, $isxxs }) =>
      ($isxxs && `
        font-size: 10px;
      `) ||
      (breakpoint === Breakpoints.XS && `
        font-size: 14px;
      `)
    }
  }
`;

const TypographyIcp = styled(TypographyAppName)`
  && {
    margin-left: 12px;
    letter-spacing: 12px;
    color: ${props => props.theme.colorAppBarIcpText};
    ${({ breakpoint }) =>
      breakpoint === Breakpoints.XS && `
        margin-left: 8.4px;
        letter-spacing: 8.4px;
      `
    }
  }
`;

/**
 * A separate div is used for the border between ICP and Explorer, so that it can be
 * animated. The height is based on TypographyAppName font-size, and matches exactly what
 * "border-right: 1px solid" in TypographyIcp would look like.
 */
const TypographyBorder = styled.div`
  && {
    width: 0px;
    height: 29px;
    border-right: ${props => '1px solid ' + props.theme.colorAppBarIcpText};
    ${({ breakpoint }) =>
      breakpoint === Breakpoints.XS && `
        height: 20.3px;
      `
    }
  }
`;

const TypographyExplorer = styled(TypographyAppName)`
  && {
    margin-left: 14px;
    letter-spacing: 7.5px;
    color: ${props => props.theme.colorAppBarExplorerText};
    ${({ breakpoint }) =>
      breakpoint === Breakpoints.XS && `
        margin-left: 9.8px;
        letter-spacing: 5.25px;
      `
    }
  }
`;

/* Rebranding Experimental - KEEP
// Internet Computer | Explorer
const TypographyIcp = styled(TypographyAppName)`
  && {
    margin-left: 20px;
    margin-right: 7px;
    letter-spacing: 3px;
    color: ${props => props.theme.colorAppBarIcpText};
    ${({ breakpoint }) =>
      breakpoint === Breakpoints.XS && `
        margin-left: 8.4px;
        letter-spacing: 3px;
      `
    }
  }
`;

const TypographyExplorer = styled(TypographyAppName)`
 && {
   margin-left: 10px;
   letter-spacing: 3px;
   color: ${props => props.theme.colorAppBarExplorerText};
   ${({ breakpoint }) =>
     breakpoint === Breakpoints.XS && `
       margin-left: 9.8px;
       letter-spacing: 3px;
     `
   }
 }
`;

// INTERNET COMPUTER | EXPLORER
const TypographyIcp = styled(TypographyAppName)`
  && {
    margin-left: 12px;
    margin-right: 8px;
    //letter-spacing: 1px;
    color: ${props => props.theme.colorAppBarIcpText};
    ${({ breakpoint }) =>
      breakpoint === Breakpoints.XS && `
        margin-left: 8.4px;
        letter-spacing: 8.4px;
      `
    }
  }
`;

const TypographyExplorer = styled(TypographyAppName)`
 && {
   margin-left: 10px;
   //letter-spacing: 1px;
   color: ${props => props.theme.colorAppBarExplorerText};
   ${({ breakpoint }) =>
     breakpoint === Breakpoints.XS && `
       margin-left: 9.8px;
       letter-spacing: 5.25px;
     `
   }
 }
`;

*/

const InputSearch = styled(Input)`
  && {
    /*
     * margin-top is used to center the Input vertically, and depends on font-size.
     * DCM 21.apr.2018: After updating Material-UI, margin-top had to be adjusted for all
     * breakpoints based on trial and error.
     */
    margin-top: 0.65rem;
    color: ${props => props.theme.colorSearchText};
    font-family: ${Constants.FONT_PRIMARY};
    font-size: ${Constants.MATERIAL_FONT_SIZE_H6};
    ${({ breakpoint }) =>
      (breakpoint === Breakpoints.SM && `
        margin-top: 0.875rem;
        /* font-size "Body 2" is not small enough to fit a hash, but this is smallest we should
           go. */
        font-size: ${Constants.MATERIAL_FONT_SIZE_BODY_2};
      `) ||
      (breakpoint === Breakpoints.XS && `
        margin-top: 0.625rem;
      `)
    }
  }
`;

const StyledIconButton = styled(IconButton)`
  && {
    color: ${props => props.theme.colorAppBarTextButton};

    &:hover {
      background: ${props => fade(props.theme.colorIconButtonHover, props.theme.opacityActionHover)};
      color: ${props => props.theme.colorIconButtonHover};
      /* Reset on touch devices. */
      @media (hover: none) {
        background: inherit;
        color: ${props => props.theme.colorAppBarTextButton};
      }
    }
  }
`;

const StyledMenuIcon = styled(MenuIcon)`
  && {
    width: 24px;
    height: 24px;
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  && {
    width: 32px;
    height: 32px;
    ${({ breakpoint }) =>
      breakpoint === Breakpoints.XS && `
        width: 24px;
        height: 24px;
      `
    }
  }
`;

const StyledCloseIcon = styled(CloseIcon)`
  && {
    width: 32px;
    height: 32px;
    ${({ breakpoint }) =>
      breakpoint === Breakpoints.XS && `
        width: 24px;
        height: 24px;
      `
    }
  }
`;

const StyledSwipeableDrawer = styled(({ ...other }) => (
  <SwipeableDrawer {...other} classes={{ paper: 'paper' }} />
))`
  & .paper {
    width: ${Constants.DRAWER_WIDTH + 'px'};
    background: ${props => props.theme.colorDrawerBackground};
  }
`;

const StyledDrawer = styled(({ ...other }) => (
  <Drawer {...other} classes={{ paper: 'paper' }} />
))`
  & .paper {
    width: ${Constants.DRAWER_WIDTH + 'px'};
    background:
      ${props => props.isdesktopdrawertransparent === 'true' ?
        props.theme.colorDrawerBackgroundTransparent : props.theme.colorDrawerBackground};
    border-right:
      ${props => props.theme.isDark ? `1px solid ${props.theme.colorBodyBackground}` : '0px'};
  }
`;

const StyledDivider = styled(Divider)`
  && {
    background: ${props => props.theme.colorDrawerDivider};
  }
`;

const DrawerListItemIcon = styled(ListItemIcon)``;

const DrawerSvgIcon = styled(SvgIcon)`
  && {
    padding-left: 2px;
    width: 20px;
    height: 20px;
  }
`;

const DrawerListItemText = styled(({ ...other }) => (
  <ListItemText {...other} classes={{ primary: 'primary' }} />
))``;

const DrawerListItem = styled(ListItem)`
  && {
    padding-top: 9.5px;
    padding-bottom: 9.5px;
    ${DrawerListItemIcon} {
      margin-left: 8px;
      color: ${
        props => props.selected ?
          props.theme.colorDrawerIconTextSelected :
          props.theme.colorDrawerIcon
      };
    }
    ${DrawerListItemText} {
      margin-left: -8px;
      & .primary {
        font-family: ${Constants.FONT_PRIMARY};
        font-size: ${Constants.MATERIAL_FONT_SIZE_BUTTON};
        font-weight: ${props => props.selected ? 600 : 400};
        color: ${
          props => props.selected ?
            props.theme.colorDrawerIconTextSelected :
            props.theme.colorDrawerText
        };
      }
    }
  }
`;

// DCM 2019-02-02: I tried for a few hours to change the "selected" background color of a ListItem
// using styled-components, but I was unsuccessful even though it seems like the code below should
// work. I was able to change the color using the Material-UI withStyles() technique of styling:
// https://stackoverflow.com/questions/50371315/how-to-override-material-ui-menuitem-selected-background-color
// However, that technique does not have access to props, so it would not work well with the way
// we're currently doing theming. There is likely a way to get this working in a way that does not
// use styled-components, but the "selected" background color is not important enough to spend the
// time on this issue right now.
/*const DrawerListItem = styled(({ ...other }) => (
  <ListItem classes={{ selected: 'selected' }} {...other} />
))`
  && {
    background: pink;
    &:focus {
      background: cyan;
    }
    &:hover {
      background: red;
    }
    // All of the above colors work, but the "selected" background color does not work.
    & .selected {
      background: blue !important;
    }
  }
`;*/

/**
 * The App Bar provides content and actions related to the current screen.
 */
class DEAppBar extends ResponsiveComponent {
  static propTypes = {
    /**
     * Callback fired when the App Bar is resized.
     */
    handleAppBarResize: PropTypes.func,
    /**
     * Callback fired when the desktop drawer (large screens) menu button is clicked.
     */
    handleDesktopDrawerMenuClick: PropTypes.func.isRequired,
    /**
     * Callback fired when the mobile drawer (small screens) menu button is clicked.
     */
    handleMobileDrawerMenuClick: PropTypes.func.isRequired,
    /**
     * True if the desktop drawer (large screens) is open.
     */    
    isDesktopDrawerOpen: PropTypes.bool.isRequired,
    /**
     * True if the desktop drawer (large screens) should be transparent.
     */    
    isDesktopDrawerTransparent: PropTypes.bool.isRequired,
    /**
     * True if the mobile drawer (small screens) is open.
     */    
    isMobileDrawerOpen: PropTypes.bool.isRequired,
    /**
     * Object containing information about the current react-router location.
     */
    location: PropTypes.object.isRequired,
    /**
     * Reference to the <HashRouter> element.
     */
    routerRef: PropTypes.object
  };

  /**
   * Create a DEAppBar object.
   * @constructor
   */
  constructor() {
    super();

    this.state = {
      isSearchOn: false,
      searchQuery: ''
    };

    this.toolbarDivRef = React.createRef();

    // Bind to make 'this' work in callbacks.
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleDownshiftStateChange = this.handleDownshiftStateChange.bind(this);
    this.handleDownshiftChange = this.handleDownshiftChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.isActiveRoute = this.isActiveRoute.bind(this);
  }

  /**
   * Return a reference to a React element to render into the DOM.
   * @return {Object} A reference to a React element to render into the DOM.
   * @public
   */
  render() {
    const { isSearchOn } = this.state;
    return (
      <Fragment>
        {/* Toolbar shim to compensate for AppBar position='fixed'. */}
        <div ref={this.toolbarDivRef}>
          <Toolbar />
        </div>
        <Fade in={isSearchOn} timeout={200} mountOnEnter unmountOnExit>
          <SearchAppBar elevation={2}>
            {this.getToolbarSearchContent()}
          </SearchAppBar>
        </Fade>
        <Fade in={!isSearchOn} timeout={200} mountOnEnter unmountOnExit>
          <StyledAppBar elevation={2}>
            {this.getToolbarDefaultContent()}
          </StyledAppBar>
        </Fade>
        {this.getDrawer()}
      </Fragment>
    );
  }

  /**
   * Invoked by React immediately after a component is mounted (inserted into the tree).
   * @public
   */
  componentDidMount() {
    super.componentDidMount();

    // Pass App Bar height to owner.
    if (this.props.handleAppBarResize)
      this.props.handleAppBarResize(this.toolbarDivRef.current.offsetHeight);
  }

  /**
   * Force the component to re-render when the window is resized.
   * @private
   */
  handleWindowResize() {
    super.handleWindowResize();

    // Pass App Bar height to owner.
    if (this.props.handleAppBarResize)
      this.props.handleAppBarResize(this.toolbarDivRef.current.offsetHeight);

    // Close the mobile drawer (small screens) when screen is resized larger, so that it does not
    // reappear when the screen is resized smaller.
    if (isBreakpointDesktop() && this.props.isMobileDrawerOpen)
      this.props.handleMobileDrawerMenuClick();
  }

  /**
   * Return the elements for the search toolbar based on the current breakpoint.
   * @return {Object} The elements for the search toolbar based on the current breakpoint.
   * @private
   */
  getToolbarSearchContent() {
    const breakpoint = getBreakpoint();
    return (
      <SearchToolbar variant='dense' breakpoint={breakpoint}>
        <Grid container direction='row' justify='space-between' alignItems='flex-start' wrap='nowrap'>
          <Grid item style={{ flexGrow: '1' }}>
            <Downshift
              onStateChange={this.handleDownshiftStateChange}
              onChange={this.handleDownshiftChange}
              selectedItem={this.state.searchQuery}
            >
              {({ getInputProps }) => (
                <div>
                  <form onSubmit={this.handleSearchSubmit}>
                    <InputSearch
                      {...getInputProps({
                        autoFocus: true,
                        disableUnderline: true,
                        fullWidth: true,
                        placeholder: 'Search for transaction'
                      })}
                      breakpoint={breakpoint}
                    />
                  </form>
                </div>
              )}
            </Downshift>
          </Grid>
          <Grid item>
            <Zoom in={true} timeout={300}>
              <IconButton onClick={this.handleCloseClick}>
                <StyledCloseIcon breakpoint={breakpoint} />
              </IconButton>
            </Zoom>
          </Grid>
        </Grid>
      </SearchToolbar>
    );
  }

  /**
   * Return the elements for the toolbar based on the current breakpoint.
   * @return {Object} The elements for the toolbar based on the current breakpoint.
   * @private
   */
  getToolbarDefaultContent() {
    const breakpoint = getBreakpoint();
    return (
      <StyledToolbar breakpoint={breakpoint}>
        <Grid container alignItems='center' wrap='nowrap'>
          <Grid item>
            {this.getMenuButton()}
          </Grid>
          {this.getAppTitle()}
          <Grid container alignItems='center' justify='flex-end' wrap='nowrap'>
            <Grid item>
              {this.getSearchButton()}
            </Grid>
          </Grid>
        </Grid>
      </StyledToolbar>
    );
  }

  /**
   * Return the elements for the menu button on the current breakpoint.
   * @return {Object} The elements for the menu button based on the current breakpoint.
   * @private
   */
  getMenuButton() {
    const { handleMobileDrawerMenuClick, handleDesktopDrawerMenuClick } = this.props;
    return (
      <Zoom in={true} timeout={300}>
        <StyledIconButton
          onClick={
            isBreakpointDesktop() ? handleDesktopDrawerMenuClick : handleMobileDrawerMenuClick
          }
        >
          <StyledMenuIcon />
        </StyledIconButton>
      </Zoom>
    );
  }

  /**
   * Return the elements for the app title based on the current breakpoint.
   * @return {Object} The elements for the app title based on the current breakpoint.
   * @private
   */
  getAppTitle() {
    const breakpoint = getBreakpoint();
    const isXxs = window.matchMedia('(max-width: 359px)').matches;
    return (
      <Link
        style={{ textDecoration: 'none' }}
        to='/'
      >
        <Grid container alignItems='center' justify='flex-start' wrap='nowrap'>
          <RevealFade timeout={500}>
            <Grid item>
              <ImgProductIcon
                src={icpExplorerLogo}
                height={this.getProductIconHeight()}
                alt='logo'
                breakpoint={breakpoint}
              >
              </ImgProductIcon>
            </Grid>
            <Grid item>
              <TypographyIcp breakpoint={breakpoint} $isxxs={isXxs}>ICP</TypographyIcp>
            </Grid>
            <RevealZoom timeout={350}>
              <Grid item>
                <TypographyBorder breakpoint={breakpoint} />
              </Grid>
            </RevealZoom>
            <Grid item>
              <TypographyExplorer breakpoint={breakpoint} $isxxs={isXxs}>ExpIorer</TypographyExplorer>
            </Grid>
          </RevealFade>
        </Grid>
      </Link>
    );
  }

  /**
   * Return the height of the product icon based on the current breakpoint.
   * @return {Number} The height of the product icon based on the current breakpoint.
   * @private
   */
  getProductIconHeight() {
    if (isBreakpointLessOrEqualTo(Breakpoints.XS))
      return 23.8;
    else
      return 34;
  }

  /**
   * Return the elements for the drawer based on the current breakpoint.
   * @return {Object} The elements for the drawer based on the current breakpoint.
   * @private
   */
  getDrawer() {
    // The Material Design documentation states: "Modal drawer: In a responsive layout grid, at a
    // defined minimum breakpoint of at least 600dp width, a standard drawer should be replaced with
    // a modal drawer." We use a modal drawer for breakpoints xs and sm (i.e., up to 960px).
    const {
      handleMobileDrawerMenuClick,
      isDesktopDrawerOpen,
      isDesktopDrawerTransparent,
      isMobileDrawerOpen
    } = this.props;
    if (isBreakpointDesktop()) {
      return (
        <StyledDrawer
          variant='persistent'
          open={isDesktopDrawerOpen}
          isdesktopdrawertransparent={isDesktopDrawerTransparent ? 'true' : 'false'}
        >
          {this.getDrawerContent()}
        </StyledDrawer>
      );
    }
    else {
      return (
        <StyledSwipeableDrawer
          open={isMobileDrawerOpen}
          onOpen={handleMobileDrawerMenuClick}
          onClose={handleMobileDrawerMenuClick}
        >
          <div onClick={handleMobileDrawerMenuClick}>
            {this.getDrawerContent()}
          </div>
        </StyledSwipeableDrawer>
      );
    }  
  }

  /**
   * Return the elements for the drawer content based on the current breakpoint.
   * @return {Object} The elements for the drawer content based on the current breakpoint.
   * @private
   */
  getDrawerContent() {
    /* Use constants for paths such as 'about' everywhere in code!!! */
    return (
      <Fragment>
        {/* Shim to compensate for AppBar position='fixed'. */}
        <Toolbar/>
        <List>
          {/* Could change this to be more generic by calling map() on an array of route objects
              which contain info such as: path, menu text, and icon.
              See: https://stackoverflow.com/questions/50801093/material-ui-drawer-selection-how-to-route
          */}
          <DrawerListItem button component={Link} to='/' selected={this.isActiveRoute('/')}>
            <DrawerListItemIcon>
              <HomeIcon />
            </DrawerListItemIcon>
            <DrawerListItemText primary='Home' selected={this.isActiveRoute('/')} />
          </DrawerListItem>
          <DrawerListItem button component={Link} to='/datacenters' selected={this.isActiveRoute('/datacenters')}>
            <DrawerListItemIcon>
              <DrawerSvgIcon>
                <path d={Constants.ICON_SVG_PATH_DATA_CENTERS} />
              </DrawerSvgIcon>
            </DrawerListItemIcon>
            <DrawerListItemText primary='Data Centers' />
          </DrawerListItem>
          <DrawerListItem button component={Link} to='/txs' selected={this.isActiveRoute('/txs')}>
            <DrawerListItemIcon>
              <DrawerSvgIcon>
                <path d={Constants.ICON_SVG_PATH_TRANSACTIONS} />
              </DrawerSvgIcon>
            </DrawerListItemIcon>
            <DrawerListItemText primary='Transactions' />
          </DrawerListItem>
          <StyledDivider />
          <DrawerListItem button component={Link} to='/about' selected={this.isActiveRoute('/about')}>
            <DrawerListItemIcon>
              <InfoIcon />
            </DrawerListItemIcon>
            <DrawerListItemText primary='About' />
          </DrawerListItem>
        </List>
      </Fragment>
    );
  }

  /**
   * Return the elements for the search button on the current breakpoint.
   * @return {Object} The elements for the search button based on the current breakpoint.
   * @private
   */
  getSearchButton() {
    const breakpoint = getBreakpoint();
    return (
      <Zoom in={true} timeout={300}>
        <StyledIconButton onClick={this.handleSearchClick}>
          <StyledSearchIcon breakpoint={breakpoint} />
        </StyledIconButton>
      </Zoom>
    );
  }

  /**
   * Callback fired when the search button is clicked.
   * @private
   */
  handleSearchClick() {
    this.setState({
      isSearchOn: true
    });
  }

  /**
   * Callback fired when the close button is clicked.
   * @private
   */
  handleCloseClick() {
    this.setState({
      isSearchOn: false
    });
  }
  
 /**
   * Callback fired any time the internal state of the Downshift component changes.
   * @param {Object} changes The properties that have changed since the last state change.
   * @private
   */
  handleDownshiftStateChange(changes) {
    const { inputValue } = changes;
    if (inputValue) {
      this.setState({
        searchQuery: inputValue
      });
    }
  }

  /**
   * Callback fired when the value of the Downshift component changes.
   * @param {Object} selectedItem The item that was just selected.
   * @private
   */
  handleDownshiftChange(selectedItem) {
    this.performSearch(selectedItem);
  }

  /**
   * Callback fired when the SearchAppBar form is submitted.
   * @param {Object} event The event source of the callback.
   * @private
   */
  handleSearchSubmit(event) {
    event.preventDefault();
    this.performSearch(this.state.searchQuery);
  }

  /**
   * Perform a search based on the specified search query.
   * @param {String} searchQuery The search quert to use for the search.
   * @private
   */
  performSearch(searchQuery) {
    this.setState({
      isSearchOn: false,
      searchQuery: ''
    });
    if (this.props.routerRef)
      this.props.routerRef.history.push(`/search/${searchQuery}`);
  }

  /**
   * Return true if the specified route matches the current route, false otherwise.
   * @param {String} routeName The name of the route to check.
   * @return {Boolean} True if the specified route matches the current route, false otherwise.
   * @private
   */
  isActiveRoute(routeName) {
    return this.props.location.pathname === routeName;
  }
};

export default withRouter(DEAppBar);