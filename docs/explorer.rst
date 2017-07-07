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

The control panel contains three tabs shown above. Use the File Tab to select
data to plot. Use the Plot Tab to see the currently plotted elements and
customize the display. Use the Tools Tab to open and save views, download data,
and adjust the plot behavior.

Files Tab
*********

Each installation is an expandable file tree. Clicking the triangle icon expands
or collapses a node. Expand an installation to see the list of root folders.
Folders contain data streams and/or subfolders. Expand a data stream to see the
list of plottable elements. Add an element to the plot by clicking the green
button next to the element name. The plot color will appear as a square patch next to
the name.

Remove an element by clicking the red button next to the element name. Elements
may only be plotted on an axis with matching units. If both left and right axes
have elements with other units, the plot button will be disabled and the
tooltip will display an error message.

Installations with owner or administrator rights will have a gear icon next to the
installation name. Click the gear to open the Installation Settings
page.

Plot Tab
********

This tab displays the currently plotted elements organized by axis. The axis
headers show the current unit on the righthand side. Hover the cursor over an
element to display the element stream and installation. The format is
``[stream_name] @ [installation_name]``.

Click the ``x`` icon next to the element entry to remove it from the plot. When
all elements are removed the Plot Tab is disabled.

Click the gear icon next to the element entry to bring up the  Plot
Settings dialog. Customization options are on the left and element information
is displayed on the right. The Path and URL refer to the NilmDB location
where this data is stored. All customizations are local to the browser- they are
not persisted to the database. Customization is available for:

* **Legend Entry**: Clear the display name field to restore the default name.
* **Color**: Click the color patch or type a custom hex value.
* **Axis**: Remember, an element can only be plotted on an axis with matching units.

.. image:: _static/explorer/plot_settings.png




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

Download example::

  ###############################################
  # Stream: Weather
  # Installation: USNA (USNA Datasets)
  # Path:   /archive/bcil/sensors/weather
  # URL: http://benchtop.vpn.wattsworth.net/nilmdb
  #
  # start:             2011-12-02 11:55:50 -0500
  # end:               2017-06-28 20:13:58 -0400
  # total time:        over 5 years
  # total rows:        1163
  # decimation factor: 1024
  # notes:
  # legend:
  #                    Column 1: time (us)
  #                    Column 2: Barometer (none)
  #                    Column 3: Outside Temp (°F)
  #                    Column 4: Dew Point (none)
  #                    Column 5: Wind Chill (none)
  #                    Column 6: Inside Humidity (none)
  #                    Column 7: Outside Humidity (none)
  #
  # --------- MATLAB INSTRUCTIONS ------------
  #
  # this file can be loaded directly into MATLAB
  #
  #   >> x = importdata('~/Downloads/filename.csv')
  #   x =
  #       data: [1737x7 double] % the data
  #   textdata: {41x1 cell}      % this help text
  #
  # --------- NILMTOOL INSTRUCTIONS ----------
  #
  # raw data can be accessed using nilmtool, run:
  #
  # $> nilmtool -u http://benchtop.vpn.wattsworth.net/nilmdb extract -s @1322844950000000 -e @1498695238647000 /archive/bcil/sensors/weather
  #
  # ------------------------------------------
  #
  1322857034602538, 30.24609, 47.51152, 28.41116, 46.0334, 34.15723, 47.46582
  1322867909921874, 30.31547, 43.41709, 30.82982, 42.68623, 38.76562, 60.99707
  ....more data....
