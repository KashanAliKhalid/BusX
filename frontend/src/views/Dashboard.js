import React, {useEffect, useState} from "react";
import ChartistGraph from "react-chartist";
import {countBus} from '../actions/busActions'
import {countStudent} from '../actions/studentActions'
import {countDriver} from '../actions/driverActions'
import {studentList} from "../actions/studentActions";


import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {complaintList} from "../actions/complaintActions";

function Dashboard({history}) {

  const dispatch= useDispatch()
  const bus =useSelector(state=>state.busCount)
  const student =useSelector(state=>state.studentCount)
  const driver =useSelector(state=>state.driverCount)
  const {students,loading}=useSelector(state=>state.studentList)
  const {complaints} =useSelector(state=>state.complaintList)
  const {busLoading,busCount}=bus
  const {studentLoading,studentCount}=student
  const {driverLoading,driverCount}=driver

  useEffect(()=>{
    dispatch(countStudent())
    dispatch(countDriver())
    dispatch(countBus())
    dispatch(studentList())
    dispatch(complaintList())
  },[dispatch])

  const feeStatus=()=>{
    let paid=0;
    let unpaid=0
    students.students.forEach((value)=>{
      if(value.feeStatus==='Paid' || value.feeStatus==='paid')
      {
        paid=paid+1
      }
      else{
        unpaid=unpaid+1
      }
    })
    return{paid,unpaid}
  }

  const complaintStats=()=>{
    const data=[0,0,0,0,0,0,0,0,0,0,0,0]
    let high;
    let low;
    if(complaints){
      complaints.complaints.forEach(complaint=>{
        data[complaint.month-1]=data[complaint.month-1]+1
      })
    }
    high=(data[0])
    low=(data[0])
    data.forEach((value)=>{
      if(value>high)
      {
        high=value
      }
      if(value<low)
      {
        low=value
      }
    })
    return {data,low,high}
  }


  const showDashboad=()=>{
    if(busLoading==false && studentLoading==false && driverLoading ==false && !loading && complaints)
    {
        return( <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-backpack text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Students</p>
                      <Card.Title as="h4">{studentCount.data.count}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>

            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-bus-front-12 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Buses</p>
                      <Card.Title as="h4">{busCount.data.count}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>

            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-single-02 text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Drivers</p>
                      <Card.Title as="h4">{driverCount.data.count}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>

            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-notes text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Complaints</p>
                      <Card.Title as="h4">{complaints.complaints.length}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Complaints</Card.Title>
                <p className="card-category">Monthly Stats</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                      data={{
                        labels: [
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                        ],
                        series: [
                          complaintStats(),
                        ],
                      }}
                      type="Line"
                      options={{
                        low: complaintStats().low,
                        high: complaintStats().high ,
                        showArea: false,
                        height: "245px",
                        axisX: {
                          showGrid: false,
                        },
                        lineSmooth: true,
                        showLine: true,
                        showPoint: true,
                        fullWidth: true,
                        chartPadding: {
                          right: 50,
                        },
                      }}
                      responsiveOptions={[
                        [
                          "screen and (max-width: 640px)",
                          {
                            axisX: {
                              labelInterpolationFnc: function (value) {
                                return value[0];
                              },
                            },
                          },
                        ],
                      ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Complaints
                </div>
                <hr></hr>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Fee statistics</Card.Title>
                <p className="card-category">No. of students</p>
              </Card.Header>
              <Card.Body>
                <div
                    className="ct-chart ct-perfect-fourth"
                    id="chartPreferences"
                >
                  <ChartistGraph
                      data={{
                        labels: [`${feeStatus().paid}`, `${feeStatus().unpaid}`],
                        series: [feeStatus().paid, feeStatus().unpaid],
                      }}
                      type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Paid <i className="fas fa-circle text-danger"></i>
                  Not-Paid
                </div>
                <hr></hr>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/*<Row>*/}
        {/*  <Col md="12">*/}
        {/*    <Card className="card-tasks">*/}
        {/*      <Card.Header>*/}
        {/*        <Card.Title as="h4">Tasks</Card.Title>*/}
        {/*        <p className="card-category">Backend development</p>*/}
        {/*      </Card.Header>*/}
        {/*      <Card.Body>*/}
        {/*        <div className="table-full-width">*/}
        {/*          <Table>*/}
        {/*            <tbody>*/}
        {/*            <tr>*/}
        {/*              <td>*/}
        {/*                <Form.Check className="mb-1 pl-0">*/}
        {/*                  <Form.Check.Label>*/}
        {/*                    <Form.Check.Input*/}
        {/*                        defaultValue=""*/}
        {/*                        type="checkbox"*/}
        {/*                    ></Form.Check.Input>*/}
        {/*                    <span className="form-check-sign"></span>*/}
        {/*                  </Form.Check.Label>*/}
        {/*                </Form.Check>*/}
        {/*              </td>*/}
        {/*              <td>*/}
        {/*                Sign contract for "What are conference organizers*/}
        {/*                afraid of?"*/}
        {/*              </td>*/}
        {/*              <td className="td-actions text-right">*/}
        {/*                <OverlayTrigger*/}
        {/*                    overlay={*/}
        {/*                      <Tooltip id="tooltip-488980961">*/}
        {/*                        Edit Task..*/}
        {/*                      </Tooltip>*/}
        {/*                    }*/}
        {/*                >*/}
        {/*                  <Button*/}
        {/*                      className="btn-simple btn-link p-1"*/}
        {/*                      type="button"*/}
        {/*                      variant="info"*/}
        {/*                  >*/}
        {/*                    <i className="fas fa-edit"></i>*/}
        {/*                  </Button>*/}
        {/*                </OverlayTrigger>*/}
        {/*                <OverlayTrigger*/}
        {/*                    overlay={*/}
        {/*                      <Tooltip id="tooltip-506045838">Remove..</Tooltip>*/}
        {/*                    }*/}
        {/*                >*/}
        {/*                  <Button*/}
        {/*                      className="btn-simple btn-link p-1"*/}
        {/*                      type="button"*/}
        {/*                      variant="danger"*/}
        {/*                  >*/}
        {/*                    <i className="fas fa-times"></i>*/}
        {/*                  </Button>*/}
        {/*                </OverlayTrigger>*/}
        {/*              </td>*/}
        {/*            </tr>*/}
        {/*            <tr>*/}
        {/*              <td>*/}
        {/*                <Form.Check className="mb-1 pl-0">*/}
        {/*                  <Form.Check.Label>*/}
        {/*                    <Form.Check.Input*/}
        {/*                        defaultChecked*/}
        {/*                        defaultValue=""*/}
        {/*                        type="checkbox"*/}
        {/*                    ></Form.Check.Input>*/}
        {/*                    <span className="form-check-sign"></span>*/}
        {/*                  </Form.Check.Label>*/}
        {/*                </Form.Check>*/}
        {/*              </td>*/}
        {/*              <td>*/}
        {/*                Lines From Great Russian Literature? Or E-mails From*/}
        {/*                My Boss?*/}
        {/*              </td>*/}
        {/*              <td className="td-actions text-right">*/}
        {/*                <OverlayTrigger*/}
        {/*                    overlay={*/}
        {/*                      <Tooltip id="tooltip-537440761">*/}
        {/*                        Edit Task..*/}
        {/*                      </Tooltip>*/}
        {/*                    }*/}
        {/*                >*/}
        {/*                  <Button*/}
        {/*                      className="btn-simple btn-link p-1"*/}
        {/*                      type="button"*/}
        {/*                      variant="info"*/}
        {/*                  >*/}
        {/*                    <i className="fas fa-edit"></i>*/}
        {/*                  </Button>*/}
        {/*                </OverlayTrigger>*/}
        {/*                <OverlayTrigger*/}
        {/*                    overlay={*/}
        {/*                      <Tooltip id="tooltip-21130535">Remove..</Tooltip>*/}
        {/*                    }*/}
        {/*                >*/}
        {/*                  <Button*/}
        {/*                      className="btn-simple btn-link p-1"*/}
        {/*                      type="button"*/}
        {/*                      variant="danger"*/}
        {/*                  >*/}
        {/*                    <i className="fas fa-times"></i>*/}
        {/*                  </Button>*/}
        {/*                </OverlayTrigger>*/}
        {/*              </td>*/}
        {/*            </tr>*/}
        {/*            <tr>*/}
        {/*              <td>*/}
        {/*                <Form.Check className="mb-1 pl-0">*/}
        {/*                  <Form.Check.Label>*/}
        {/*                    <Form.Check.Input*/}
        {/*                        defaultChecked*/}
        {/*                        defaultValue=""*/}
        {/*                        type="checkbox"*/}
        {/*                    ></Form.Check.Input>*/}
        {/*                    <span className="form-check-sign"></span>*/}
        {/*                  </Form.Check.Label>*/}
        {/*                </Form.Check>*/}
        {/*              </td>*/}
        {/*              <td>*/}
        {/*                Flooded: One year later, assessing what was lost and*/}
        {/*                what was found when a ravaging rain swept through*/}
        {/*                metro Detroit*/}
        {/*              </td>*/}
        {/*              <td className="td-actions text-right">*/}
        {/*                <OverlayTrigger*/}
        {/*                    overlay={*/}
        {/*                      <Tooltip id="tooltip-577232198">*/}
        {/*                        Edit Task..*/}
        {/*                      </Tooltip>*/}
        {/*                    }*/}
        {/*                >*/}
        {/*                  <Button*/}
        {/*                      className="btn-simple btn-link p-1"*/}
        {/*                      type="button"*/}
        {/*                      variant="info"*/}
        {/*                  >*/}
        {/*                    <i className="fas fa-edit"></i>*/}
        {/*                  </Button>*/}
        {/*                </OverlayTrigger>*/}
        {/*                <OverlayTrigger*/}
        {/*                    overlay={*/}
        {/*                      <Tooltip id="tooltip-773861645">Remove..</Tooltip>*/}
        {/*                    }*/}
        {/*                >*/}
        {/*                  <Button*/}
        {/*                      className="btn-simple btn-link p-1"*/}
        {/*                      type="button"*/}
        {/*                      variant="danger"*/}
        {/*                  >*/}
        {/*                    <i className="fas fa-times"></i>*/}
        {/*                  </Button>*/}
        {/*                </OverlayTrigger>*/}
        {/*              </td>*/}
        {/*            </tr>*/}
        {/*            <tr>*/}
        {/*              <td>*/}
        {/*                <Form.Check className="mb-1 pl-0">*/}
        {/*                  <Form.Check.Label>*/}
        {/*                    <Form.Check.Input*/}
        {/*                        defaultChecked*/}
        {/*                        type="checkbox"*/}
        {/*                    ></Form.Check.Input>*/}
        {/*                    <span className="form-check-sign"></span>*/}
        {/*                  </Form.Check.Label>*/}
        {/*                </Form.Check>*/}
        {/*              </td>*/}
        {/*              <td>*/}
        {/*                Create 4 Invisible User Experiences you Never Knew*/}
        {/*                About*/}
        {/*              </td>*/}
        {/*              <td className="td-actions text-right">*/}
        {/*                <OverlayTrigger*/}
        {/*                    overlay={*/}
        {/*                      <Tooltip id="tooltip-422471719">*/}
        {/*                        Edit Task..*/}
        {/*                      </Tooltip>*/}
        {/*                    }*/}
        {/*                >*/}
        {/*                  <Button*/}
        {/*                      className="btn-simple btn-link p-1"*/}
        {/*                      type="button"*/}
        {/*                      variant="info"*/}
        {/*                  >*/}
        {/*                    <i className="fas fa-edit"></i>*/}
        {/*                  </Button>*/}
        {/*                </OverlayTrigger>*/}
        {/*                <OverlayTrigger*/}
        {/*                    overlay={*/}
        {/*                      <Tooltip id="tooltip-829164576">Remove..</Tooltip>*/}
        {/*                    }*/}
        {/*                >*/}
        {/*                  <Button*/}
        {/*                      className="btn-simple btn-link p-1"*/}
        {/*                      type="button"*/}
        {/*                      variant="danger"*/}
        {/*                  >*/}
        {/*                    <i className="fas fa-times"></i>*/}
        {/*                  </Button>*/}
        {/*                </OverlayTrigger>*/}
        {/*              </td>*/}
        {/*            </tr>*/}
        {/*            <tr>*/}
        {/*              <td>*/}
        {/*                <Form.Check className="mb-1 pl-0">*/}
        {/*                  <Form.Check.Label>*/}
        {/*                    <Form.Check.Input*/}
        {/*                        defaultValue=""*/}
        {/*                        type="checkbox"*/}
        {/*                    ></Form.Check.Input>*/}
        {/*                    <span className="form-check-sign"></span>*/}
        {/*                  </Form.Check.Label>*/}
        {/*                </Form.Check>*/}
        {/*              </td>*/}
        {/*              <td>Read "Following makes Medium better"</td>*/}
        {/*              <td className="td-actions text-right">*/}
        {/*                <OverlayTrigger*/}
        {/*                    overlay={*/}
        {/*                      <Tooltip id="tooltip-160575228">*/}
        {/*                        Edit Task..*/}
        {/*                      </Tooltip>*/}
        {/*                    }*/}
        {/*                >*/}
        {/*                  <Button*/}
        {/*                      className="btn-simple btn-link p-1"*/}
        {/*                      type="button"*/}
        {/*                      variant="info"*/}
        {/*                  >*/}
        {/*                    <i className="fas fa-edit"></i>*/}
        {/*                  </Button>*/}
        {/*                </OverlayTrigger>*/}
        {/*                <OverlayTrigger*/}
        {/*                    overlay={*/}
        {/*                      <Tooltip id="tooltip-922981635">Remove..</Tooltip>*/}
        {/*                    }*/}
        {/*                >*/}
        {/*                  <Button*/}
        {/*                      className="btn-simple btn-link p-1"*/}
        {/*                      type="button"*/}
        {/*                      variant="danger"*/}
        {/*                  >*/}
        {/*                    <i className="fas fa-times"></i>*/}
        {/*                  </Button>*/}
        {/*                </OverlayTrigger>*/}
        {/*              </td>*/}
        {/*            </tr>*/}
        {/*            </tbody>*/}
        {/*          </Table>*/}
        {/*        </div>*/}
        {/*      </Card.Body>*/}
        {/*    </Card>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
      </Container>)
    }
  }

  return (
    <>{showDashboad()}
    </>
  );
}

export default Dashboard;
