import React from 'react'

const useGenre = (selectedGenres) => {
    if(selectedGenres.length < 1) return "";
 const selectedIds = selectedGenres.map((selectedGenre)=>selectedGenre.id)
  return selectedIds.reduce((acc,curr)=> acc +","+ curr)
  
}

export default useGenre