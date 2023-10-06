import React, { useState, useEffect } from 'react';

<div>
    <input type="file" accept="image/*" name="image" id="file" onchange="loadFile(event)" style="display: none;">
    <label for="file" style="cursor: pointer;">Upload Image</label>
    <img id="output" width="200" />
</div>

<script>
    var loadFile = function(event) {
        var image = document.getElementById('output');
        image.src = URL.createObjectURL(event.target.files[0]);
    };
</script>