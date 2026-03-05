import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import EditableLink from './EditableLink';
import AdminHeader from './AdminHeader';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Edit = ({ username }) => {

  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const token = localStorage.getItem('auth-token');
  const config = {
    headers: {'auth-token': token}
  }

  // This function is passed down to the EditableLink component and is called whenever a Link is deleted.
  // That forces this component to update which removes the deleted link from the ui
  const rerender = () => {
    setDeleted(!deleted);
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(links);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setLinks(items);

    // Save new order to backend
    axios.patch(`/users/${username}/reorder`, { links: items }, config)
      .catch(err => {
        console.log(err.response);
        // Revert on error
        setDeleted(!deleted);
      });
  }

  useEffect(() => {
    const getLinks = () => {
      axios.get(`/users/${username}`)
        .then(res => {
          setLinks(res.data.links);
          setLoading(false);
        })
        .catch(err => {
          console.log(err.response);
        })
    }
    getLinks();

  }, [username, deleted]);

  return ( 
    (loading) ? <div className="green-container"><div className="loader"><ClipLoader sizeUnit={"px"} size={150} color={'rgb(31, 28, 28)'} loading={true}/></div></div>
    : (<>
        <AdminHeader edit={'active'}/>
        <div className="linksList">
          {(links.length > 0) ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="links">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {links.map((link, index) => (
                      <Draggable key={link._id} draggableId={link._id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <EditableLink 
                              id={link._id} 
                              link={link} 
                              username={username} 
                              rerender={rerender}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (<h1>Your Linktree is empty.</h1>)}
        </div>
      </>)
  )
}

export default Edit
