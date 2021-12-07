import React,{useState,useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

// react-bootstrap components
import SearchField from "react-search-field";
import {
    Button,
    Container,
    Row,
    Col,
    Form, Tooltip, OverlayTrigger,
} from "react-bootstrap";

import  '../../assets/css/list.css'
import adminAvatar from  '../../assets/img/admin.jpg'
import Pagination from 'react-responsive-pagination';
import 'font-awesome/css/font-awesome.min.css';
import {adminList,deleteAdmin} from '../../actions/adminActions'
import SimpleLoader from '../../components/Loaders/SimpleLoader'
import DeleteLoader from '../../components/Loaders/DeleteLoader'
import YellowButton from "../../components/Buttons/YellowButton";


const AdminList=({history, location})=>{
    const dispatch= useDispatch()
    const {loading,error,admins} =useSelector(state=>state.adminList)
    const {success,deleting}=useSelector(state=>state.adminDelete)

    const [currentPage, setCurrentPage] = useState(1);
    const[search, setSearch]=useState('')




    const handleDelete=(id)=>{
        dispatch(deleteAdmin(id))
    }


    useEffect(()=>{
        if(location.search){
            dispatch(adminList(location.pathname+location.search))
        }
        else{
            dispatch(adminList(location.pathname))
        }



    },[location,dispatch,success])

    const handleSearch= (value,event)=>{
        setCurrentPage(1)
        setSearch(value)
        if(value!=='')
            history.push(`/superadmin/admins?search=${value}`)
        else{
            history.push(`/superadmin/admins`)
        }
    }

    const pageChangeHandler=(page)=>{
        setCurrentPage(page);
        if(search==='')
        {
            history.push(`/superadmin/admins?page=${page}`)
        }
        else{
            history.push(`/superadmin/admins?search=${search}&page=${page}`)
        }
    }



    const list=()=>{
        if(deleting===true)
        {
            // setTimeout(function(){return; }, 2000);
            return <DeleteLoader/>
        }
        else
            return(

                <Container fluid>
                    <Row>
                        <Col xs={9} md={10}>
                            <SearchField
                                placeholder="Search Name"
                                classNames="search search-route"
                                onEnter={handleSearch}
                            />
                        </Col>
                        <Col className="ml-xs-2" xs={3} md={2}>
                            <YellowButton onClick={()=>{history.push('/superadmin/addadmin')}} content=" Add Admin"/>
                        </Col>


                    </Row>
                    {
                        admins===undefined? '' : admins.admins.map(admin =>{
                            return(
                                <div key={admin._id}  className='table-entry'>
                                    <Row  className='justify-content-center flex-row align-items-center' >
                                        <Col xs={10} md={1}>
                                            <img style={{objectFit:'contain'}} className='img-thumbnail ' width={100} height={100}
                                                 src={adminAvatar} />

                                        </Col>
                                        <Col xs={2} className='d-md-none'>
                                            <Form.Check className='checkbox'>
                                                <Form.Check.Label>
                                                    <Form.Check.Input
                                                        type="checkbox"
                                                        onClick={(e)=>{console.log(e.target.checked)}}
                                                    ></Form.Check.Input>
                                                    <span className="form-check-sign"></span>
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </Col>
                                        <Col  xs={6} md={6}>
                                            <p >
                                                <span>{admin.name} </span><br/>
                                                <span>{admin.institute}</span>
                                            </p>

                                        </Col>
                                        <Col className=' d-flex justify-content-end' xs={6} md={4}>

                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip id="tooltip-829164576">Remove</Tooltip>
                                                }
                                            >
                                                <Button onClick={()=>{handleDelete(admin._id)}}  size='sm' className='btn-fill btn-padding btn-margin' variant="danger"><i className=" far fa-trash-alt fa-2x "> </i></Button>
                                            </OverlayTrigger>


                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip id="tooltip-829164576">Profile</Tooltip>
                                                }
                                            >
                                                <Button onClick={()=>{history.push(`/superadmin/admin/${admin._id}`)}} size='sm'  className='btn-fill btn-padding' variant="primary"><i className=" icon-margin far fa-id-card fa-2x "> </i></Button>
                                            </OverlayTrigger>
                                        </Col>
                                        <Col md={1} className='d-none d-md-block'>
                                            <Form.Check className='checkbox'>
                                                <Form.Check.Label>
                                                    <Form.Check.Input
                                                        type="checkbox"
                                                        onClick={(e)=>{console.log(e.target.checked)}}
                                                    ></Form.Check.Input>
                                                    <span className="form-check-sign"></span>
                                                </Form.Check.Label>
                                            </Form.Check>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })

                    }
                    {
                        admins===undefined? '' : (<Pagination
                            current={admins.page}
                            total={admins.pages}
                            onPageChange={pageChangeHandler}
                        />)
                    }

                </Container>
            )
    }

    return (
        <>
            {
                loading===true? <SimpleLoader/> : list()
            }
        </>
    );
}

export default AdminList;
