
    <body class="nav-menu">
        <div id="header" class="full-width">
            <div id="header-core" class="mainCenter">
                <span class="helper"></span><?php echo $this->Html->image('logo.png', ['alt' => 'Learning Energy Systems Logo', 'height' => '100px', 'class' => 'logo']); ?>
                <select id="selectSubjects">
                    <option>All Subjects</option>
                </select>
                <select id="selectWeeks">
                    <option>All Weeks</option>
                </select>
                <span style="color:#8C8080; margin:0px 10px">Show Total Energy Use</span><input class="checkbox" type="checkbox" name="show_total_check" id="show_total_check" value="show_total" />
            </div>
        </div>
        <div id="chart" class="full-width">
            <div id="innerWrapper" class="mainCenter">
                <div id="energyIcons" class="floatLeft">
                    <p style="color:#A8A6A6; margin-top:0px">Select Sources</p>
                    <?php echo $this->Html->image('projector-subject-icon.png', ['name' => 'projector', 'class' => 'energyIcon isSelected']); ?>
                    <p class="label" labelFor="projector">X</p>
                    <?php echo $this->Html->image('lightBulb-subject-icon.png', ['name' => 'light', 'class' => 'energyIcon isSelected']); ?>
                    <p class="label" labelFor="light">X</p>
                    <?php echo $this->Html->image('heater-subject-icon.png', ['name' => 'heater', 'class' => 'energyIcon isSelected']); ?>
                    <p class="label" labelFor="heater">X</p>
                    <?php echo $this->Html->image('computer-subject-icon.png', ['name' => 'computer', 'class' => 'energyIcon isSelected']); ?>
                    <p class="label" labelFor="computer">X</p>
                </div>
                <div id="canvasContainer" class="floatLeft"></div>
                <h3 id="selectedCircleValue">Selected Value: </h3>
            </div>
        </div>
        <div id="legendOuter" class="full-width">
            <div id="legendInner" class="mainCenter">
                <?php echo $this->Html->image('scale.png', ['width' => '90%', 'height' => 'auto', 'style' => 'padding-left:20px']); ?>
            </div>
        </div>
        <div id="learningQuestions" class="mainCenter">
            <h2>Energy Diary - Learning Questions</h2>
            <form id="questionsForm" action="placeholder.php">
                <textarea id="questionTextArea" class="qA" rows="10" cols="30" placeholder="Enter Question"></textarea> 
                <textarea id="answerTextArea" class="qA" rows="10" cols="30" placeholder="Enter Answer"></textarea> 
                <input type="submit" value="Add" class="addButton">
            </form>
            <div id="questionsWrapper" class="mainCenter">
                
            </div>
        </div>
        <?= $this->Html->script('d3.js') ?>
        <?= $this->Html->script('dash.js') ?>
    </body>