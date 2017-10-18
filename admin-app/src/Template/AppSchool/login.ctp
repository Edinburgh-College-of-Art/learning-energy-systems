
    <body>
        <div id="header" class="full-width">
            <div id="header-core" class="mainCenter">
                <span class="helper"></span><?php echo $this->Html->image('logo-large.png', ['alt' => 'Learning Energy Systems Logo', 'height' => '180px', 'class' => 'login-logo']); ?>
            </div>
        </div>
        <div id="loginSection" class="mainCenter">
            <h2 class="login-header">Login to Dashboard</h2>
            	<?= $this->Flash->render('auth') ?>
				<?= $this->Form->create() ?>
				<?php 
				use \Cake\Error\Debugger as Debugger;
				// $this->loadModel('app_school');
				// Debugger::dump($this); 
				?>
                <!-- <input name="school" placeholder="School">
                <input type="password" name="password" placeholder="Password">
                <input type="submit" value="Go" class="addButton"> -->
                <?= $this->Form->input('school_name', ['label' => false, 'placeholder' => 'School Name']) ?>
		        <?= $this->Form->input('password', ['label' => false, 'placeholder' => 'Password']) ?>
		        <?= $this->Form->button(__('Submit')); ?>
				<?= $this->Form->end() ?>
            </form>
        </div>
    </body>
