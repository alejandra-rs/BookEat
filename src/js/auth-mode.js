function popupMode(id1, id_disable){
    if (id_disable != null){
        const popup_disable = document.getElementById(id_disable);
        popup_disable.style.display = 'none';
    }
    const popup = document.getElementById(id1);
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden';
}


function closeLoginPopup(id) {
    document.body.style.overflow = 'auto';
    document.getElementById(id).style.display = 'none';
}