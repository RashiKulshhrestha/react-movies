// import React from "react";
// import { List, message, Avatar, Spin, Row, Col, Input } from 'antd';
// import reqwest from 'reqwest';
// import "./Dashboard.css";
// import 'antd/dist/antd.css';

import InfiniteScroll from 'react-infinite-scroller';

// const { Search } = Input;
// const API_KEY = 'a81ac4ea';
// const SearchBox = ({searchHandler}) => {
//     return (
//         <Row>
//             <Col span={12} offset={6}>
//                 <Search
//                     placeholder="enter movie, series, episode name"
//                     enterButton="Search"
//                     size="large"
//                     onSearch={value => searchHandler(value)}
//                 />
//             </Col>
//         </Row>
//     )
// }

// class Dashboard extends React.Component {
//   state = {
//     data: [],
//     loading: false,
//     hasMore: true,
//     q: 'batman'
//   };

//   componentDidMount() {
//     this.fetchData(res => {
//       this.setState({
//         data: res.results,
//       });
//     });
//   }

//   fetchData = callback => {
//     reqwest({
//       url: `https://www.omdbapi.com/?apikey=${API_KEY}&&s=${this.state.q}`,
//       type: 'json',
//       method: 'get',
//       contentType: 'application/json',
//       success: res => {
//         callback(res);
//       },
//     });
//   };

//   handleInfiniteOnLoad = () => {
//     let { data } = this.state;
//     this.setState({
//       loading: true,
//     });
//     if (data.length > 14) {
//       message.warning('Infinite List loaded all');
//       this.setState({
//         hasMore: false,
//         loading: false,
//       });
//       return;
//     }
//     this.fetchData(res => {
//       data = data.concat(res.results);
//       this.setState({
//         data,
//         loading: false,
//       });
//     });
//   };

//   render() {
//     return (
//       <div className="demo-infinite-container">
//           <SearchBox/>
//         <InfiniteScroll
//           initialLoad={false}
//           pageStart={0}
//           loadMore={this.handleInfiniteOnLoad}
//           hasMore={!this.state.loading && this.state.hasMore}
//           useWindow={false}
//         >
//           <List
//             dataSource={this.state.data}
//             renderItem={item => (
//               <List.Item key={item.id}>
//                 <List.Item.Meta
//                   avatar={
//                     <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
//                   }
//                   title={<a href="https://ant.design">{item.name.last}</a>}
//                   description={item.email}
//                 />
//                 <div>Content</div>
//               </List.Item>
//             )}
//           >
//             {this.state.loading && this.state.hasMore && (
//               <div className="demo-loading-container">
//                 <Spin />
//               </div>
//             )}
//           </List>
//         </InfiniteScroll>
//       </div>
//     );
//   }
// }

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import { 
    Layout, 
    Input, 
    Row, 
    Col, 
    Card, 
    Tag, 
    Spin,
    Select,
    Button,
    Alert, 
    Modal, 
    Typography 
} from 'antd';
import 'antd/dist/antd.css';

const API_KEY = 'a81ac4ea';
const { Header, Content, Footer } = Layout;
const { Search } = Input;
const { Meta } = Card;
const TextTitle = Typography.Title;
const { Option } = Select;

const SearchBox = ({searchHandler}) => {
    return (
        <Row>
            <Col span={12} offset={6}>
                <Search
                    placeholder="enter movie, series, episode name"
                    enterButton="Search"
                    size="large"
                    onSearch={value => searchHandler(value)}
                />
            </Col>
        </Row>
    )
}

const ColCardBox = ({Title, imdbID, Poster, Type, ShowDetail, DetailRequest, ActivateModal }) => {
    const [favouriteText,setFavouriteText] = useState("Add to Favourites");
    const [disabled, setDisable] = useState(false);

    const clickHandler = () => {

        // Display Modal and Loading Icon
        ActivateModal(true);
        DetailRequest(true);

        fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`)
        .then(resp => resp)
        .then(resp => resp.json())
        .then(response => {
            DetailRequest(false);
            ShowDetail(response);
        })
        .catch(({message}) => {
            DetailRequest(false);
        })
    }

    return (
        <Col className="gutter-row" span={4}>
            <div className="gutter-box">
                <Card
                    cover={
                        <img
                            alt={Title}
                            src={Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : Poster}
                            onClick={() => clickHandler()}
                            
                        />
                    }
                   
                >
                    <Meta
                            title={Title}
                            description={false}
                    />
                    <Row className="gutter-row">
                        <Col>
                            <Tag color="magenta">{Type}</Tag>
                        </Col>
                        <Col>
                          <i className="fa fa-thumb-tack" aria-hidden="true"></i>
                        </Col>
                    </Row>
                    
                </Card>
            </div>
        </Col>
    )
}

const MovieDetail = ({Title, Poster, imdbRating, Rated, Runtime, Genre, Plot}) => {
    return (
        <Row>
            <Col span={11} >
                <img 
                    src={Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : Poster} 
                    alt={Title} 
                />
            </Col>
            <Col span={13}>
                <Row>
                    <Col span={21}>
                        <TextTitle level={4}>{Title}</TextTitle></Col>
                    <Col span={3} >
                        <TextTitle level={4}><span style={{color: '#41A8F8'}}>{imdbRating}</span></TextTitle>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Tag>{Rated}</Tag> 
                        <Tag>{Runtime}</Tag> 
                        <Tag>{Genre}</Tag>
                    </Col>
                </Row>
                <Row>
                    <Col>{Plot}</Col>
                </Row>
            </Col>
        </Row>
    )
}

const Loader = () => (
    <div className="spin">
        <Spin />
    </div>
)

function Dashboard() {
    state = {
        data: [],
        loading: false,
        hasMore: true,
    };


    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [q, setQuery] = useState('batman');
    const [activateModal, setActivateModal] = useState(false);
    const [detail, setShowDetail] = useState(false);
    const [detailRequest, setDetailRequest] = useState(false);
    
    
    useEffect(() => {

        setLoading(true);
        setError(null);
        setData(null);
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&&s=${q}`)
        .then(resp => resp)
        .then(resp => resp.json())
        .then(response => {
            if (response.Response === 'False') {
                setError(response.Error);
            }
            else {
                setData(response.Search);
            }

            setLoading(false);
        })
        .catch(({message}) => {
            setError(message);
            setLoading(false);
        })

    }, [q]);

    const handleInfiniteOnLoad = () => {
        let { data } = this.state;
        this.setState({
            loading: true,
        });
        this.fetchData(res => {
            data = data.concat(res.results);
            this.setState({
            data,
            loading: false,
            });
        });
        };

    return (
        <div className="App">
            <Layout className="layout">
                <Header>
                    <div>
                        <TextTitle className="header-omdb" level={3}>OMDB MOVIES
                            <Button>Logout</Button>
                        </TextTitle>
                    </div>
                </Header>
                <Content>
                    <div>
                    <div className="search-bar">
                        <SearchBox searchHandler={setQuery} />
                    </div>
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={handleInfiniteOnLoad}
                        hasMore={!this.state.loading && this.state.hasMore}
                        useWindow={false}
                    >
                        <Row gutter={16} type="flex" justify="center">
                            { loading &&
                                <Loader />
                            }

                            { error !== null &&
                                <div className="danger-alert">
                                    <Alert message={error} type="error" />
                                </div>
                            }
                            
                            { data !== null && data.length > 0 && data.map((result, index) => (
                                <ColCardBox 
                                    ShowDetail={setShowDetail} 
                                    DetailRequest={setDetailRequest}
                                    ActivateModal={setActivateModal}
                                    key={index} 
                                    {...result} 
                                />
                            ))}
                        </Row>
                    </InfiniteScroll>
                        
                    </div>
                    <Modal
                        title='Detail'
                        centered
                        visible={activateModal}
                        onCancel={() => setActivateModal(false)}
                        footer={null}
                        width={800}
                        >
                        { detailRequest === false ?
                            (<MovieDetail {...detail} />) :
                            (<Loader />) 
                        }
                    </Modal>
                    
                </Content>
                <Footer className="center">OMDB Movies ©2020</Footer>
            </Layout>
        </div>
    );
}

export default Dashboard;