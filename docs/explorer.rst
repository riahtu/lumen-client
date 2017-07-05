.. raw:: html

    <script type="text/javascript" >
    $(document).ready(function(){
      $(".click-to-play").click(function(event){
        var target = $(event.target);
        var currentSrc = target.attr("src")
        if(currentSrc.endsWith("png"))
          target.attr("src",currentSrc.replace("png","gif"))
        else
          target.attr("src",currentSrc.replace("gif","png"))
      });
    })

    </script>

Data Explorer
=============

.. image:: _static/explorer/screenshot.png


Main Plot
---------

The Main Plot interface supports pan and zoom on three axes (left-y, right-y and
time). Click and drag to pan. Scroll or double click to zoom. The plot is
divided into four regions as shown in the figure below. The zoom and pan
controls operate differently depending on the cursor location.

Plot Regions
************

.. image:: _static/explorer/axis_regions.png

Axis Isolation
***************************

When the cursor is in the center of the plot, pan and zoom operates
simultaneously on all the axes. In general it is easier to manipulate one axis
at a time.  To isolate an axis move the cursor towards the desired axis until it
is highlighted.

**Left/Right Y Axes:**

  .. rst-class:: click-to-play
  .. image:: _static/explorer/left_axis_lock.png

Both the left and right y-axes can be isolated. Adjust the offset between left
and right axes by isolating one side and panning up or down.

**Time:**

  .. rst-class:: click-to-play
  .. image:: _static/explorer/time_axis_lock.png

Date Selector
*************

Plotting Errors
***************
Insufficient Decimation
Error Contacting Server


Navigation Plot
---------------

The Navigation Plot shows a fixed overview of the data and highlights the
portion displayed in the Main Plot. The y-axis is fixed to the autoscale values
of the data (either the range of the plotted data or the ``Default Max`` and
``Default Min`` of the streams). In the default navigation mode clicking and
dragging on the plot selects the subset of data displayed in the Main Plot
window. This mode is animated in the left hand figure below. The mode can be
changed on the Tool Tab by clicking the Zoom Lock check box. When this box is
checked the time range of the selection is locked. Clicking and dragging the
selection window changes the fixed time range displayed in the Main Plot. This
mode is animated in the right hand figure below.


Control Panel
-------------

Files Tab
*********

Plot Tab
********

Tools Tab
*********

Autoscale Axes
++++++++++++++

Data Cursor
+++++++++++

Lock Selection Width
++++++++++++++++++++

Live Update
+++++++++++


Data Views
----------

Open View
*********

Save View
*********

Download
--------

Image
*****

Data
****
