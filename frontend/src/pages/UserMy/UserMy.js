import React, { useState, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
//STYLES
import styled from 'styled-components';
import {useSelector} from "react-redux";


function UserMy() {
    const [gosuLists, setGosuLists] = useState([]);
    const [isToggleHeight, setIsToggleHeight] = useState(false);
    // const [matchedLists, setMatchedLists] = useState([{name:'gosu1',_idx:30},{name:'gosu2',_idx:31}]);
    // const [matchedUserLists, setMatchedUserLists] = useState([{name:'user1',_idx:32},{name:'user2',_idx:33}]);
    const user_info = useSelector((state) => state.user.user);
    const [userLists, setUserLists] = useState([]);
    const viewGosuList = () => {
        setIsToggleHeight(prev => !prev);
    };
    const goToGosuDetail = id => {
        window.location.href = `/GosuInfo/${id}`
    }
    const goToUserDetail = id => {
        window.location.href = `/GosuInfoDetail/${id}`
    }
    useEffect(() => {
        fetch(`/matchedgosulist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('access_token'),
            },
            body: JSON.stringify(
                {email: localStorage.getItem('email')}
            )
        })
            .then(res => res.json())
            .then((res)=>  {
                console.log(res);
                setGosuLists(res
                )
            });
    }, []);
    useEffect(() => {
        fetch(`/matchedList`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('access_token'),
            },
            body: JSON.stringify(
                {email: localStorage.getItem('email')}
            )
        })
            .then(res => res.json())
            .then(res => {
                console.log(localStorage.getItem('email'))
                console.log(res)
                setUserLists(res
                    // [
                    // {
                    //     // image: '/images/winter6.jpg', //?????? or ?????? ?????????
                    //     name: '?????? ?????????', // ??????
                    //     age: '??????????????? ???????????????~', // ?????? or ?????? ????????????
                    //     region: '??????', // ?????? or ?????? ??????
                    //     carrer: 5, // ?????? or ?????? ????????????
                    //     id: 1, // ?????? or ?????? ?????????
                    //     category: 10, // ????????? ????????? ?????? , ????????? ????????? ??????
                    // },
                    // {
                    //     // image: '/images/4.jpg',
                    //     name: '?????? ?????????',
                    //     age: '??????????????? ???????????????~',
                    //     region: '??????',
                    //     carrer: 5,
                    //     id: 2,
                    //     category: 10,
                    // },
                    // {
                    //     // image: '/images/winter9.png',
                    //     name: '?????? ?????????',
                    //     age: '??????????????? ???????????????~',
                    //     region: '??????',
                    //     carrer: 5,
                    //     id: 3,
                    //     category: 10,
                    // },
                    // {
                    //     // image: '/images/winter6.jpg',
                    //     name: '?????? ?????????',
                    //     age: '??????????????? ???????????????~',
                    //     region: 4,
                    //     carrer: 5,
                    //     id: 4,
                    //     category: 10,
                    // }
                    // ]
                )

            }
            );
    }, []);

    return (
        <>
            {
                user_info &&
        <Container>
            <Box>
                {
                    user_info.role == 'ROLE_GOSU' ?
                        (<>
                            <WelcomeName>???????????????, {user_info.nickname}???</WelcomeName>
                            <Estimation onClick={()=>{
                                window.location.href='/GosuDetail'
                            }}>?????????</Estimation>
                            <GosuListBox onClick={viewGosuList}>
                                <GosuListText>????????? ?????? ?????????</GosuListText>
                                {isToggleHeight ? (
                                    <IoIosArrowUp className="listIcon" />
                                ) : (
                                    <IoIosArrowDown className="listIcon" />
                                )}
                            </GosuListBox>
                            <>
                            <ListWrap className={isToggleHeight ? 'active' : null}>
                                <>
                                {userLists.map((matchedUserList, i) => {
                                    return (
                                        <List key={i}>
                                            <ListImg alt="gosu_image" src={`/images/winter${i+5}.jpg`} />
                                            <Estimation  style={{marginBottom:'0px',marginLeft:'10px'}}>{matchedUserList.name}</Estimation>
                                            <Estimation style={{marginBottom:'0px',marginLeft:'70px',color:'red'}} onClick={()=>{
                                                goToUserDetail(matchedUserList.id)
                                            }}>??????</Estimation>
                                        </List>
                                    );
                                })}
                                </>
                            </ListWrap>
                            </>
                        </>) :
                        (<>
                            <WelcomeName>???????????????, {user_info.nickname}???</WelcomeName>
                            <Estimation>?????? ??????</Estimation>
                            <GosuListBox onClick={viewGosuList}>
                                <GosuListText >????????? ????????? ?????????</GosuListText>
                                {isToggleHeight ? (
                                    <IoIosArrowUp className="listIcon" />
                                ) : (
                                    <IoIosArrowDown className="listIcon" />
                                )}
                            </GosuListBox>
                            <ListWrap className={isToggleHeight ? 'active' : null}>
                                {gosuLists.map((matchedList, i) => {
                                    return (
                                        <List key={i}>
                                            <ListImg alt="gosu_image" src={`/images/winter${i +6}.jpg`} />
                                            <Estimation  style={{marginBottom:'0px',marginLeft:'10px'}}>{matchedList.gosuName}</Estimation>
                                            <Estimation style={{marginBottom:'0px',marginLeft:'70px',color:'red'}} onClick={()=>{
                                                goToGosuDetail(matchedList.id)
                                            }}>??????</Estimation>
                                        </List>
                                    );
                                })}
                            </ListWrap>
                        </>)
                }
            </Box>
        </Container>
            }
                </>
    );
}

export default UserMy;

const Container = styled.div`
  ${({ theme }) => theme.flex('center', 'center', null)};
  position: absolute;
  top: 50px;
  right: 0;
  padding: 20px 30px;
  background-color: #fff;
  box-shadow: 0 5px 10px hsla(0, 0%, 0%, 0.4);
  z-index: 11;
  margin-top : 20px;
  margin-right : 80px;
`;

const Box = styled.div`
  ${({ theme }) => theme.flex('center', 'flex-start', 'column')};
`;

const WelcomeName = styled.h2`
  margin-bottom: 30px;
  padding: 0 20px;
  font-size: 15px;
  font-weight: bold;
`;

const Estimation = styled.p`
  margin-bottom: 30px;
  font-size: 15px;
  cursor: pointer;
`;

const GosuListBox = styled.div`
  ${({ theme }) => theme.flex('flex-start', 'center', 'row')};
  margin-bottom: 20px;
  cursor: pointer;
  .listIcon {
    margin-bottom: 3px;
  }
`;

const GosuListText = styled.p`
  padding-right: 5px;
  font-size: 15px;
  cursor: pointer;
`;

const ListWrap = styled.ul`
  width: 100%;
  height: 100px;
  overflow-y: hidden;
  &.active {
    height: auto;
  }
`;

const List = styled.li`
  ${({ theme }) => theme.flex('flex-start', 'center', null)};
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

const ListImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

const ListName = styled.p`
  ${({ theme }) => theme.flex('flex-start', 'center', null)};
  margin: 2px 0 0 10px;
`;