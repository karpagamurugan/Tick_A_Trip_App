import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TableCell } from "@mui/material";
import PropTypes from "prop-types";
import moment from "moment";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Modal from "@mui/material/Modal";
import Pagination from "@mui/material/Pagination";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import flightIcon from "../../asset/icons/center.svg";
import { BookingModel } from "./BookingModel";
import actions from "../../redux/flight/actions";
import commonActions from "../../redux/common/actions";
import { API_IMG_URL } from "../../utils/constant";
import loaderGifImg from "../../asset/loader_flight.gif";
import flightActions from "../../redux/flight/actions";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "0px solid #000",
    boxShadow: 24,
    p: 4,
    overflowY: "scroll",
    height: "85vh",
    borderRadius: "1rem",
};

function Item(props) {
    const { sx, ...other } = props;
    return <Box {...other} />;
}

Item.propTypes = {
    sx: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
        ),
        PropTypes.func,
        PropTypes.object,
    ]),
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    flightname: {
        color: "#000",
        fontSize: "15px",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: "bottom",
        height: 20,
        width: 20,
    },
    details: {
        alignItems: "center",
    },
    column: {
        flexBasis: "25%",
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.Boxider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
        },
    },
}));

function FlightList1(props) {

    const dispatch = useDispatch();
    const classes = useStyles();
    const { resultData, fareRulesFlight, fareRulesLoader, flightLoader, SearchFlight } = useSelector(
        (state) => state.flightReducer
    );
    const { flightList } = useSelector(
        (state) => state.flightReducer
    );

    const [details, setDetails] = useState("");
    const [value, setValue] = useState("1");
    const [dropdown, setDropdown] = useState([]);
    const [open, setOpen] = useState("");

    const handleClose = () => {
        setOpen("");
        dispatch({ type: flightActions.SET_VALIDATE_FARE_METHOD, payload: [] });
        dispatch({ type: flightActions.SET_BOOKING_CONFIRM, payload: false });
        dispatch({ type: flightActions.SET_BOOKIG_RESPONSE_DATA, payload: null });
    }

    const handleFlightDetail = (item, index) => {
        setDetails(item);
        setValue("1");
        dispatch({ type: actions.SET_FARE_RULES, payload: null });
        dispatch({
            type: actions.GET_FARE_RULES,
            payload: {
                fareSourceCode: item.FareSourceCode,
            },
        });
        dispatch({ type: actions.SET_FARE_RULES_LOADER, payload: true });
    };

    const handleOpen = (it, index) => {
        dispatch({ type: commonActions.SET_LOADER, payload: true });
        setOpen(it);
        dispatch({
            type: actions.GET_VALIDATE_FARE_METHOD,
            payload: {
                fare_source_code: it.FareSourceCode
            },
        });
        dispatch({ type: actions.SET_FARE_RULES, payload: null });
        dispatch({
            type: actions.SET_BOOKIN_FARE_SOURCE_METHOD,
            payload: {
                fare_source_code: it.FareSourceCode,
                fare_type: it.FareType
            },
        });
    };

    function timeConvert(n) {
        var num = n;
        var hours = Math.floor(num / 60) > 0 ? Math.floor(num / 60) + "H " : "";
        var rminutes =
            n - Math.floor(num / 60) * 60 > 0
                ? n - Math.floor(num / 60) * 60 + "M"
                : "";
        return hours + rminutes;
    }

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    const handleDropdown = (index) => {
        if (dropdown.includes(index)) {
            setDropdown(dropdown.filter(el => el !== index));
        } else {
            setDropdown([...dropdown, index]);
        }
    }

    console.log(props.selectedFlightList);
    console.log(SearchFlight);

    return (
        <>
            <Box className="flight_payment_pop">
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className={`${flightLoader && 'model_overFlow_box'}`}>
                        <BookingModel
                            it={open}
                        />
                    </Box>
                </Modal>
            </Box>
            <Box className="flight_payment_pop">
                <Modal
                    open={details}
                    onClose={() => setDetails("")}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <TabContext value={value}>
                            <Box
                                sx={{
                                    borderBottom: 1,
                                    borderColor: "divider",
                                }}
                            >
                                <TabList
                                    className="tb_bnl"
                                    onChange={handleChangeTab}
                                >
                                    <Tab
                                        label={
                                            <span className={classes.tabLabel}>
                                                Flight Details
                                            </span>
                                        }
                                        value="1"
                                    />
                                    <Tab
                                        label={
                                            <span className={classes.tabLabel}>
                                                FareRules
                                            </span>
                                        }
                                        value="2"
                                    />
                                </TabList>
                            </Box>
                            <TabPanel
                                className={classes.tabinner}
                                value="1"
                            >
                                {details.flight_details?.map((item1, ind) => (
                                    <div key={'details.flight_details' + ind}>
                                        {item1.flights?.map((inst, i) => {
                                            return (
                                                <div
                                                    key={'item1.flights' + i}
                                                >
                                                    <Box
                                                        className={classes.root}
                                                    >
                                                        <Box className="flight_root">
                                                            <Box>
                                                                <Box className="ticket_tab_con_head flight_root_details">
                                                                    <TableCell
                                                                        className={`${classes.column}`}
                                                                    >
                                                                        <div className=" flight_image_grid">
                                                                            <img
                                                                                className="floght_single_logo"
                                                                                src={
                                                                                    API_IMG_URL +
                                                                                    "/server/flightimage/" +
                                                                                    details?.flightUrl
                                                                                }
                                                                                style={{
                                                                                    width: "60px",
                                                                                    marginRight: "0.5rem",
                                                                                    height: "60px",
                                                                                    display: "inline-block",
                                                                                    verticalAlign: "middle",
                                                                                    borderRadius: '50%'
                                                                                }}
                                                                                alt={details?.flightName}
                                                                            />
                                                                            <span className="flight_number">
                                                                                {inst.flightList
                                                                                    .OperatingAirline
                                                                                    .Code +
                                                                                    inst.flightList
                                                                                        .OperatingAirline
                                                                                        .FlightNumber}
                                                                            </span>
                                                                        </div>

                                                                    </TableCell>

                                                                    <Box
                                                                        sx={{
                                                                            display: "flex",
                                                                            alignItems:
                                                                                "flex-start",
                                                                            p: 0,
                                                                            m: 0,
                                                                            bgcolor:
                                                                                "background.paper",
                                                                            borderRadius: 1,
                                                                        }}
                                                                        className="destinamtion_flight"
                                                                    >
                                                                        <Item className="flight_desk">
                                                                            <span className="flight_from">
                                                                                {
                                                                                    inst.departureLocation
                                                                                }
                                                                                (
                                                                                {
                                                                                    inst.flightList
                                                                                        .DepartureAirportLocationCode
                                                                                }
                                                                                )
                                                                            </span>
                                                                            <br />
                                                                            <span className="flight_timr">
                                                                                {moment(
                                                                                    inst.flightList
                                                                                        .DepartureDateTime
                                                                                )
                                                                                    ?.format(
                                                                                        "hh:mm:ss a"
                                                                                    )
                                                                                    .substring(0, 5)}
                                                                            </span>
                                                                            <br />
                                                                            <span className="flight_when">
                                                                                {moment(
                                                                                    inst.flightList
                                                                                        .DepartureDateTime
                                                                                )
                                                                                    ?.format(
                                                                                        "hh:mm:ss a"
                                                                                    )
                                                                                    .substring(9, 11)
                                                                                    ?.toUpperCase()}
                                                                            </span>
                                                                        </Item>
                                                                        <Item className="flight_desk desk_ce">
                                                                            <span className="flight_hrs">
                                                                                {timeConvert(
                                                                                    inst.flightList
                                                                                        .JourneyDuration
                                                                                )}
                                                                            </span>
                                                                            <br />
                                                                            <span className="flight_timr flight_icon">
                                                                                <img
                                                                                    src={flightIcon}
                                                                                    alt="img"
                                                                                />
                                                                            </span>
                                                                            <br />
                                                                        </Item>
                                                                        <Item className="flight_desk">
                                                                            <span className="flight_from">
                                                                                {inst.arrivalLocation}
                                                                                (
                                                                                {
                                                                                    inst.flightList
                                                                                        .ArrivalAirportLocationCode
                                                                                }
                                                                                )
                                                                            </span>
                                                                            <br />
                                                                            <span className="flight_timr">
                                                                                {moment(
                                                                                    inst.flightList
                                                                                        .ArrivalDateTime
                                                                                )
                                                                                    ?.format(
                                                                                        "hh:mm:ss a"
                                                                                    )
                                                                                    .substring(0, 5)}
                                                                            </span>
                                                                            <br />
                                                                            <span className="flight_when">
                                                                                {moment(
                                                                                    inst.flightList
                                                                                        .ArrivalDateTime
                                                                                )
                                                                                    ?.format(
                                                                                        "hh:mm:ss a"
                                                                                    )
                                                                                    .substring(9, 11)
                                                                                    ?.toUpperCase()}
                                                                            </span>
                                                                        </Item>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                    {item1.flights[i + 1] && (
                                                        <Box className="connecting_waiting_time">
                                                            {timeConvert(
                                                                moment(
                                                                    item1.flights[i + 1]
                                                                        .flightList
                                                                        .DepartureDateTime
                                                                ).diff(
                                                                    item1.flights[i].flightList
                                                                        .ArrivalDateTime,
                                                                    "minutes"
                                                                )
                                                            )}
                                                        </Box>
                                                    )}
                                                </div>
                                            );
                                        })}
                                        <hr></hr>
                                    </div>
                                ))}
                            </TabPanel>
                            <TabPanel
                                className={classes.tabinner}
                                value="2"
                            >
                                <Box className="flight_dropdown_details">
                                    <Box className="trip_price_slider trip_rules">
                                        {fareRulesLoader ? (
                                            <div>
                                                <div className="blur_bg"></div>
                                                <div className="loaderGif">
                                                    <img src={loaderGifImg} alt="" />
                                                </div>
                                            </div>
                                        ) : fareRulesFlight?.startsWith(
                                            "https"
                                        ) ? (
                                            <>
                                                <div>
                                                    <p>
                                                        Kindly visit the following link
                                                        for rules:
                                                    </p>

                                                    <b>
                                                        <a
                                                            href={fareRulesFlight}
                                                            dangerouslySetInnerHTML={{
                                                                __html: fareRulesFlight,
                                                            }}
                                                        ></a>
                                                    </b>
                                                </div>
                                            </>
                                        ) : (
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: fareRulesFlight,
                                                }}
                                            ></div>
                                        )}
                                    </Box>
                                </Box>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Modal>
            </Box>
            {flightList?.length > 0 && (
                <>
                    <Box className="flight_list_sec">
                        {SearchFlight?.journey_type === "OneWay" ?
                            props.selectedFlightList?.map((it, index) => {
                                return (
                                    <div className="p-r" key={'selectedFlightList' + index}>
                                        {it[0]?.flight_details?.map((item1, ind) => {
                                            return (
                                                <div key={'flight_details' + ind}>
                                                    <>
                                                        <Box className={classes.root} key={'ticket_tab_con_head' + index}>
                                                            <Box className="ticket_tab_con_head">
                                                                <div className="MuiTableCell-root MuiTableCell-sizeMedium makeStyles-column-29">
                                                                    <div className=" flight_image_grid">
                                                                        <img
                                                                            className="floght_single_logo"
                                                                            src={
                                                                                API_IMG_URL +
                                                                                "/server/flightimage/" +
                                                                                it[0].flightUrl
                                                                            }
                                                                            style={{
                                                                                width: "60px",
                                                                                marginRight: "0.5rem",
                                                                                height: "60px",
                                                                                display: "inline-block",
                                                                                verticalAlign: "middle",
                                                                                borderRadius: '50%'
                                                                            }}
                                                                            alt="FlightImage1"
                                                                        />
                                                                        <span
                                                                            className="flightname"
                                                                            style={{
                                                                                color: "#3d3d3d",
                                                                                cursor: "pointer",
                                                                                display: "inline-block",
                                                                                verticalAlign: "middle",
                                                                            }}
                                                                        >
                                                                            {it[0].flightName}
                                                                        </span>
                                                                    </div>


                                                                    <span className="flight_number">
                                                                        {item1.flights
                                                                            .map(
                                                                                (obj) =>
                                                                                    obj.flightList.OperatingAirline
                                                                                        .Code +
                                                                                    obj.flightList.OperatingAirline
                                                                                        .FlightNumber
                                                                            )
                                                                            ?.join(" / ")}
                                                                    </span>
                                                                </div>

                                                                <Box
                                                                    sx={{
                                                                        display: "flex",
                                                                        alignItems: "flex-start",
                                                                        p: 0,
                                                                        m: 0,
                                                                        bgcolor: "background.paper",
                                                                        borderRadius: 1,
                                                                    }}
                                                                    className="destinamtion_flight"
                                                                >
                                                                    <Item className="flight_desk">
                                                                        <span className="flight_from">
                                                                            {item1.flights[0].departureLocation}(
                                                                            {
                                                                                item1.flights[0].flightList
                                                                                    .DepartureAirportLocationCode
                                                                            }
                                                                            )
                                                                        </span>
                                                                        <br />
                                                                        <span className="flight_timr">
                                                                            {moment(
                                                                                item1.flights[0].flightList
                                                                                    .DepartureDateTime
                                                                            )
                                                                                ?.format("hh:mm:ss a")
                                                                                .substring(0, 5)}
                                                                        </span>
                                                                        <br />
                                                                        <span className="flight_when">
                                                                            {moment(
                                                                                item1.flights[0].flightList
                                                                                    .DepartureDateTime
                                                                            )
                                                                                ?.format("hh:mm:ss a")
                                                                                .substring(9, 11)
                                                                                ?.toUpperCase()}
                                                                        </span>
                                                                    </Item>
                                                                    <Item className="flight_desk desk_ce">
                                                                        <span className="flight_hrs">
                                                                            {timeConvert(
                                                                                item1.flights.reduce(
                                                                                    (total, val) =>
                                                                                    (total =
                                                                                        total +
                                                                                        parseFloat(
                                                                                            val.flightList.JourneyDuration
                                                                                                ? parseFloat(
                                                                                                    val.flightList
                                                                                                        .JourneyDuration
                                                                                                )
                                                                                                : 0
                                                                                        )),
                                                                                    0
                                                                                )
                                                                            )}
                                                                        </span>
                                                                        <br />
                                                                        <span className="flight_timr flight_icon">
                                                                            <img src={flightIcon} alt="img" />
                                                                        </span>
                                                                        <span className="stop">
                                                                            {item1.totalStops} Stop
                                                                        </span>
                                                                        <br />
                                                                    </Item>
                                                                    <Item className="flight_desk">
                                                                        <span className="flight_from">
                                                                            {
                                                                                item1.flights[
                                                                                    item1.flights.length - 1
                                                                                ].arrivalLocation
                                                                            }
                                                                            (
                                                                            {
                                                                                item1.flights[
                                                                                    item1.flights.length - 1
                                                                                ].flightList
                                                                                    .ArrivalAirportLocationCode
                                                                            }
                                                                            )
                                                                        </span>
                                                                        <br />
                                                                        <span className="flight_timr">
                                                                            {moment(
                                                                                item1.flights[
                                                                                    item1.flights.length - 1
                                                                                ].flightList.ArrivalDateTime
                                                                            )
                                                                                ?.format("hh:mm:ss a")
                                                                                .substring(0, 5)}
                                                                        </span>
                                                                        <br />
                                                                        <span className="flight_when">
                                                                            {moment(
                                                                                item1.flights[
                                                                                    item1.flights.length - 1
                                                                                ].flightList.ArrivalDateTime
                                                                            )
                                                                                ?.format("hh:mm:ss a")
                                                                                .substring(9, 11)
                                                                                ?.toUpperCase()}
                                                                        </span>
                                                                    </Item>
                                                                </Box>
                                                                <Box className="flight_view_details book_btm">

                                                                    <div>
                                                                        <Button className="book_tick_price">
                                                                            <span className="rs">Rs : </span>
                                                                            {it[0].totalFare}{" "}
                                                                        </Button>
                                                                        <Button
                                                                            onClick={() => handleDropdown(it[0]?.FareSourceCode)}
                                                                            className="book_tick"
                                                                        >
                                                                            {dropdown?.includes(it[0]?.FareSourceCode) ? 'Hide Details' : 'View Details'}
                                                                        </Button>
                                                                    </div>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </>
                                                </div>
                                            );
                                        })}
                                        {
                                            dropdown.includes(it[0].FareSourceCode) ?
                                                it.map(it1 => it1.flight_details?.map((item1, ind) => {
                                                    return (
                                                        <div className="flight_dropdown_details" key={'flight_dropdown_details' + ind}>
                                                            <div className="trip_price_slider trip_rules">
                                                                <Box className={classes.root} key={'ticket_tab_con_head' + index}>
                                                                    <Box className="ticket_tab_con_head">
                                                                        <div className="MuiTableCell-root MuiTableCell-sizeMedium makeStyles-column-29">
                                                                            <div className=" flight_image_grid">
                                                                                <img
                                                                                    className="floght_single_logo"
                                                                                    src={
                                                                                        API_IMG_URL +
                                                                                        "/server/flightimage/" +
                                                                                        it1.flightUrl
                                                                                    }
                                                                                    style={{
                                                                                        width: "60px",
                                                                                        marginRight: "0.5rem",
                                                                                        height: "60px",
                                                                                        display: "inline-block",
                                                                                        verticalAlign: "middle",
                                                                                        borderRadius: '50%'
                                                                                    }}
                                                                                    alt="FlightImage1"
                                                                                />
                                                                                <span
                                                                                    className="flightname"
                                                                                    style={{
                                                                                        color: "#3d3d3d",
                                                                                        cursor: "pointer",
                                                                                        display: "inline-block",
                                                                                        verticalAlign: "middle",
                                                                                    }}
                                                                                >
                                                                                    {it1.flightName}
                                                                                </span>
                                                                            </div>


                                                                            <span className="flight_number">
                                                                                {item1.flights
                                                                                    .map(
                                                                                        (obj) =>
                                                                                            obj.flightList.OperatingAirline
                                                                                                .Code +
                                                                                            obj.flightList.OperatingAirline
                                                                                                .FlightNumber
                                                                                    )
                                                                                    ?.join(" / ")}
                                                                            </span>
                                                                        </div>

                                                                        <Box
                                                                            sx={{
                                                                                display: "flex",
                                                                                alignItems: "flex-start",
                                                                                p: 0,
                                                                                m: 0,
                                                                                bgcolor: "background.paper",
                                                                                borderRadius: 1,
                                                                            }}
                                                                            className="destinamtion_flight"
                                                                        >
                                                                            <Item className="flight_desk">
                                                                                <span className="flight_from">
                                                                                    {item1.flights[0].departureLocation}(
                                                                                    {
                                                                                        item1.flights[0].flightList
                                                                                            .DepartureAirportLocationCode
                                                                                    }
                                                                                    )
                                                                                </span>
                                                                                <br />
                                                                                <span className="flight_timr">
                                                                                    {moment(
                                                                                        item1.flights[0].flightList
                                                                                            .DepartureDateTime
                                                                                    )
                                                                                        ?.format("hh:mm:ss a")
                                                                                        .substring(0, 5)}
                                                                                </span>
                                                                                <br />
                                                                                <span className="flight_when">
                                                                                    {moment(
                                                                                        item1.flights[0].flightList
                                                                                            .DepartureDateTime
                                                                                    )
                                                                                        ?.format("hh:mm:ss a")
                                                                                        .substring(9, 11)
                                                                                        ?.toUpperCase()}
                                                                                </span>
                                                                            </Item>
                                                                            <Item className="flight_desk desk_ce">
                                                                                <span className="flight_hrs">
                                                                                    {timeConvert(
                                                                                        item1.flights.reduce(
                                                                                            (total, val) =>
                                                                                            (total =
                                                                                                total +
                                                                                                parseFloat(
                                                                                                    val.flightList.JourneyDuration
                                                                                                        ? parseFloat(
                                                                                                            val.flightList
                                                                                                                .JourneyDuration
                                                                                                        )
                                                                                                        : 0
                                                                                                )),
                                                                                            0
                                                                                        )
                                                                                    )}
                                                                                </span>
                                                                                <br />
                                                                                <span className="flight_timr flight_icon">
                                                                                    <img src={flightIcon} alt="img" />
                                                                                </span>
                                                                                <span className="stop">
                                                                                    {item1.totalStops} Stop
                                                                                </span>
                                                                                <br />
                                                                            </Item>
                                                                            <Item className="flight_desk">
                                                                                <span className="flight_from">
                                                                                    {
                                                                                        item1.flights[
                                                                                            item1.flights.length - 1
                                                                                        ].arrivalLocation
                                                                                    }
                                                                                    (
                                                                                    {
                                                                                        item1.flights[
                                                                                            item1.flights.length - 1
                                                                                        ].flightList
                                                                                            .ArrivalAirportLocationCode
                                                                                    }
                                                                                    )
                                                                                </span>
                                                                                <br />
                                                                                <span className="flight_timr">
                                                                                    {moment(
                                                                                        item1.flights[
                                                                                            item1.flights.length - 1
                                                                                        ].flightList.ArrivalDateTime
                                                                                    )
                                                                                        ?.format("hh:mm:ss a")
                                                                                        .substring(0, 5)}
                                                                                </span>
                                                                                <br />
                                                                                <span className="flight_when">
                                                                                    {moment(
                                                                                        item1.flights[
                                                                                            item1.flights.length - 1
                                                                                        ].flightList.ArrivalDateTime
                                                                                    )
                                                                                        ?.format("hh:mm:ss a")
                                                                                        .substring(9, 11)
                                                                                        ?.toUpperCase()}
                                                                                </span>
                                                                            </Item>
                                                                        </Box>
                                                                        <Box className="flight_view_details book_btm">

                                                                            <div>
                                                                                <Button className="book_tick_price">
                                                                                    <span className="rs">Rs : </span>
                                                                                    {it1.totalFare}{" "}
                                                                                </Button>
                                                                                <Button
                                                                                    onClick={() => handleOpen(it1, index)}
                                                                                    className="book_tick"
                                                                                >
                                                                                    Book Now
                                                                                </Button>
                                                                            </div>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </div>
                                                            <div className="flight_view_details book_btm flight_dropdown_details ">
                                                                <Button
                                                                    onClick={() => handleFlightDetail(it1, index)}
                                                                    className="view_flight_class"
                                                                >
                                                                    {SearchFlight?.class ? SearchFlight?.class + ' Class' : 'Economy Class'}
                                                                </Button>
                                                                <div>
                                                                    <Button
                                                                        onClick={() => handleFlightDetail(it1, index)}
                                                                        className="view_flight_detail_btn"
                                                                    >
                                                                        View Flight Details
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })) : <></>
                                        }

                                    </div>
                                );
                            }) :
                            props.selectedFlightList?.map((it, index) => {
                                return (
                                    <div className="p-r" key={'selectedFlightList' + index}>
                                        {it.flight_details?.map((item1, ind) => {
                                            return (
                                                <div key={'flight_details' + ind}>
                                                    <>
                                                        <Box className={classes.root} key={'ticket_tab_con_head' + index}>
                                                            <Box>
                                                                <Box className="ticket_tab_con_head">
                                                                    <div className="MuiTableCell-root MuiTableCell-sizeMedium makeStyles-column-29">
                                                                        <div className=" flight_image_grid">
                                                                            <img
                                                                                className="floght_single_logo"
                                                                                src={
                                                                                    API_IMG_URL +
                                                                                    "/server/flightimage/" +
                                                                                    it.flightUrl
                                                                                }
                                                                                style={{
                                                                                    width: "60px",
                                                                                    marginRight: "0.5rem",
                                                                                    height: "60px",
                                                                                    display: "inline-block",
                                                                                    verticalAlign: "middle",
                                                                                    borderRadius: '50%'
                                                                                }}
                                                                                alt="FlightImage1"
                                                                            />
                                                                            <span
                                                                                className="flightname"
                                                                                style={{
                                                                                    color: "#3d3d3d",
                                                                                    cursor: "pointer",
                                                                                    display: "inline-block",
                                                                                    verticalAlign: "middle",
                                                                                }}
                                                                            >
                                                                                {it.flightName}
                                                                            </span>
                                                                        </div>
                                                                        <span className="flight_number">
                                                                            {item1.flights
                                                                                .map(
                                                                                    (obj) =>
                                                                                        obj.flightList.OperatingAirline
                                                                                            .Code +
                                                                                        obj.flightList.OperatingAirline
                                                                                            .FlightNumber
                                                                                )
                                                                                ?.join(" / ")}
                                                                        </span>
                                                                    </div>
                                                                    <Box
                                                                        sx={{
                                                                            display: "flex",
                                                                            alignItems: "flex-start",
                                                                            p: 0,
                                                                            m: 0,
                                                                            bgcolor: "background.paper",
                                                                            borderRadius: 1,
                                                                        }}
                                                                        className="destinamtion_flight"
                                                                    >
                                                                        <Item className="flight_desk">
                                                                            <span className="flight_from">
                                                                                {item1.flights[0].departureLocation}(
                                                                                {
                                                                                    item1.flights[0].flightList
                                                                                        .DepartureAirportLocationCode
                                                                                }
                                                                                )
                                                                            </span>
                                                                            <br />
                                                                            <span className="flight_timr">
                                                                                {moment(
                                                                                    item1.flights[0].flightList
                                                                                        .DepartureDateTime
                                                                                )
                                                                                    ?.format("hh:mm:ss a")
                                                                                    .substring(0, 5)}
                                                                            </span>
                                                                            <br />
                                                                            <span className="flight_when">
                                                                                {moment(
                                                                                    item1.flights[0].flightList
                                                                                        .DepartureDateTime
                                                                                )
                                                                                    ?.format("hh:mm:ss a")
                                                                                    .substring(9, 11)
                                                                                    ?.toUpperCase()}
                                                                            </span>
                                                                        </Item>
                                                                        <Item className="flight_desk desk_ce">
                                                                            <span className="flight_hrs">
                                                                                {timeConvert(
                                                                                    item1.flights.reduce(
                                                                                        (total, val) =>
                                                                                        (total =
                                                                                            total +
                                                                                            parseFloat(
                                                                                                val.flightList.JourneyDuration
                                                                                                    ? parseFloat(
                                                                                                        val.flightList
                                                                                                            .JourneyDuration
                                                                                                    )
                                                                                                    : 0
                                                                                            )),
                                                                                        0
                                                                                    )
                                                                                )}
                                                                            </span>
                                                                            <br />
                                                                            <span className="flight_timr flight_icon">
                                                                                <img src={flightIcon} alt="img" />
                                                                            </span>
                                                                            <span className="stop">
                                                                                {item1.totalStops} Stop
                                                                            </span>
                                                                            <br />
                                                                        </Item>
                                                                        <Item className="flight_desk">
                                                                            <span className="flight_from">
                                                                                {
                                                                                    item1.flights[
                                                                                        item1.flights.length - 1
                                                                                    ].arrivalLocation
                                                                                }
                                                                                (
                                                                                {
                                                                                    item1.flights[
                                                                                        item1.flights.length - 1
                                                                                    ].flightList
                                                                                        .ArrivalAirportLocationCode
                                                                                }
                                                                                )
                                                                            </span>
                                                                            <br />
                                                                            <span className="flight_timr">
                                                                                {moment(
                                                                                    item1.flights[
                                                                                        item1.flights.length - 1
                                                                                    ].flightList.ArrivalDateTime
                                                                                )
                                                                                    ?.format("hh:mm:ss a")
                                                                                    .substring(0, 5)}
                                                                            </span>
                                                                            <br />
                                                                            <span className="flight_when">
                                                                                {moment(
                                                                                    item1.flights[
                                                                                        item1.flights.length - 1
                                                                                    ].flightList.ArrivalDateTime
                                                                                )
                                                                                    ?.format("hh:mm:ss a")
                                                                                    .substring(9, 11)
                                                                                    ?.toUpperCase()}
                                                                            </span>
                                                                        </Item>
                                                                    </Box>
                                                                    <Box className="flight_view_details book_btm">

                                                                        <div>
                                                                            <Button className="book_tick_price">
                                                                                <span className="rs">Rs : </span>
                                                                                {it.totalFare}{" "}
                                                                            </Button>
                                                                            <Button
                                                                                onClick={() => handleOpen(it, index)}
                                                                                className="book_tick"
                                                                            >
                                                                                Book Now
                                                                            </Button>
                                                                        </div>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                        <div className="flight_view_details flight_dropdown_details book_btm trip_price_slider ">
                                                            <Button
                                                                onClick={() => handleFlightDetail(it, index)}
                                                                className="view_flight_class"
                                                            >
                                                                {SearchFlight?.class ? SearchFlight?.class + ' Class' : 'Economy Class'}
                                                            </Button>
                                                            <Button
                                                                onClick={() => handleFlightDetail(it, index)}
                                                                className="view_flight_detail_btn"
                                                            >
                                                                View Flight Details
                                                            </Button>
                                                        </div>
                                                    </>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })

                        }
                        <Pagination
                            count={props.count}
                            defaultPage={1}
                            page={resultData.length < 8 ? 1 : props.page}
                            onChange={props.handlePaginationChange}
                        />
                    </Box>
                </>
            )
            }
        </>
    );
}

export default React.memo(FlightList1);
