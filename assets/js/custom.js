//====================  Init Variables  =================//
let rowNum = 1;
var listspeakers = getSpeakerList();
var status = true;

//====================  Events  =================//

$(function() {
    populatedataList();
});

$(document).on('click','#start_transcribing', function(e){
    $('.card-body').css("display","block");
    $('.card-footer #final-content').css("display","flex");
    $('.card-footer #initial-content').css("display","none");
    addSpeaker();
})

$(document).on('keydown', '#transcript-wrapper', function(e) {
    if (e.keyCode == 13 && e.shiftKey) { //shift enter key to create next speaker
        e.preventDefault();
        addSpeaker();
    }
})

$(document).on('focusout', '.select-speaker', function(e) {
    speaker = $.trim($(this).val());
    UpdatedataList(speaker);
})

$(document).on('click','#btn_new_entry', function(e){
    addSpeaker();
});

$(document).on('paste','.speaker_statement',function(e){
    e.preventDefault();//Prevent the default action
    var text = (e.originalEvent || e).clipboardData.getData('text/plain');//get text representation of clipboard
    document.execCommand("insertHTML", false, text);//insert text manually
});

$(document).on('focus','.speaker_statement',function(e){
    this.classList.add('active');
});

$(document).on('blur','.speaker_statement',function(e){
    this.classList.remove('active');
});

//====================  Functions  =================//

function addSpeaker() {
    //Append A new speaker entry to transcript
    var template = $('#single-entry-template');
    $("#transcript-wrapper").append($(template).html());
    $("#transcript-wrapper .my-entry:last-child").attr('id','entry_'+rowNum);
    $("#transcript-wrapper #entry_"+rowNum+" #select-speaker").focus();
    rowNum += 1;   
    status = false;
};

function getSpeakerList() {
    var speakers = ["Judge", "Assistant", "Cleark", "Speaker 1"];
    speakers.sort();
    return speakers;
}

function populatedataList() {
    var speakers = listspeakers;
    var option = "";
    for (let i = 0; i < speakers.length; i++) {
        option += '<option value="' + speakers[i] + '">';
    }
    $("#options").html(option);
}

function UpdatedataList(currentSpeaker) {
    var speakers = listspeakers;
    var option = "";
    for (let i = 0; i < speakers.length; i++) {
        var index = speakers.indexOf(currentSpeaker);
        if (index == -1) {
            speakers.push(currentSpeaker); 
            //push to array if it does not exists
            //console.log(speakers);
            //update Array to be using this list thereafter
            listspeakers = speakers;
        }
        speakers.sort();
        option += '<option value="' + speakers[i] + '">';
    }
    $("#options").html(option);
}
   