function loadInvites() {
    invitations.forEach( function (inv) {
        var el = document.getElementById("invitationT");
        var clone = document.importNode(el.content, true);

        clone.querySelector(".gname").innerHTML = inv.name;

        document.getElementById("invitations").appendChild(clone);
    });
}

loadInvites();