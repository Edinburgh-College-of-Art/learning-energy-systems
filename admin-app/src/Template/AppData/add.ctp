<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('List App Data'), ['action' => 'index']) ?></li>
    </ul>
</div>
<div class="appData form large-10 medium-9 columns">
    <?= $this->Form->create($appData) ?>
    <fieldset>
        <legend><?= __('Add App Data') ?></legend>
        <?php
            echo $this->Form->input('app_students_unique_id');
            echo $this->Form->input('subject');
            echo $this->Form->input('light');
            echo $this->Form->input('computer');
            echo $this->Form->input('heater');
            echo $this->Form->input('projector');
            echo $this->Form->input('lightString');
            echo $this->Form->input('computerString');
            echo $this->Form->input('heaterString');
            echo $this->Form->input('projectorString');
            echo $this->Form->input('date');
            echo $this->Form->input('time_inserted');
        ?>
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
</div>
