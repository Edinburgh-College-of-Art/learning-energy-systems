
    <body>
        <div id="header" class="full-width">
            <div id="header-core" class="mainCenter">
                <span class="helper"></span><?php echo $this->Html->image('logo.png', ['alt' => 'Learning Energy Systems Logo', 'height' => '100px', 'class' => 'logo']); ?>
            </div>
        </div>
        <div id="loginSection" class="mainCenter">
            <h2>Login</h2>
            	<?= $this->Flash->render('auth') ?>
				<?= $this->Form->create('AppSchool') ?>
				<?php 
				use \Cake\Error\Debugger as Debugger;
				// $this->loadModel('app_school');
				// Debugger::dump($this); 
				?>
                <!-- <input name="school" placeholder="School">
                <input type="password" name="password" placeholder="Password">
                <input type="submit" value="Go" class="addButton"> -->
                <?= $this->Form->input('school_name') ?>
		        <?= $this->Form->input('password') ?>
		        <?= $this->Form->button(__('Submit')); ?>
				<?= $this->Form->end() ?>
            </form>
        </div>
    </body>
