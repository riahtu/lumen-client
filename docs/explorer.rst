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
simultaneously on all the axes. It is often more intuitive to manipulate one
axis at a time.  To isolate an axis move the cursor towards the desired axis
until it is highlighted.

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

.. image:: _static/explorer/date_selector.png

Open the date selector by clicking the date text
below the main plot. The selector overlay allows you to specify exact time
bounds for the main plot. The navigation plot is unaffected.


Plotting Errors
***************

As you interact with the plot, you may encounter error messages like the
following:

.. rst-class:: plot-error
some data could not be retrieved

These errors may occur periodically due to a slow or unreliable connection
with the remote installation. Pan or zoom the plot to retry the request. If
an initial data request fails, the plot may zoom to an incorrect location.
Use the autoscale buttons in the tool panel to recenter the plot.

.. rst-class:: plot-warning
some data cannot be displayed at this resolution

If a continuous or discrete element is not sufficiently decimated or if an event
element has too many samples the plot data will be replaced with a thick line
and an asterix will appear next to the legend entry. Once you have zoomed in
sufficiently the data will reappear. To avoid this problem make sure the data
stream is fully decimated, then refresh the installation database.


Navigation Plot
---------------

The Navigation Plot shows a fixed overview of the data and highlights the
portion displayed in the Main Plot. The y-axis is fixed to the autoscale values
of the data (either the range of the plotted data or the ``Default Max`` and
``Default Min`` of the streams). Click and drag to select the range of
data displayed in the Main Plot.


Control Panel
-------------

.. image:: _static/explorer/control_panel.png

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
