<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Form->postLink(
                __('Delete'),
                ['action' => 'delete', $appSchool->id],
                ['confirm' => __('Are you sure you want to delete # {0}?', $appSchool->id)]
            )
        ?></li>
        <li><?= $this->Html->link(__('List App School'), ['action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('List App Questions'), ['controller' => 'AppQuestions', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New App Question'), ['controller' => 'AppQuestions', 'action' => 'add']) ?></li>
        <li><?= $this->Html->link(__('List App Students'), ['controller' => 'AppStudents', 'action' => 'index']) ?></li>
        <li><?= $this->Html->link(__('New App Student'), ['controller' => 'AppStudents', 'action' => 'add']) ?></li>
    </ul>
</div>
<div class="appSchool form large-10 medium-9 columns">
    <?= $this->Form->create($appSchool) ?>
    <fieldset>
        <legend><?= __('Edit App School') ?></legend>
        <?php
            echo $this->Form->input('school_name');
            echo $this->Form->input('password');
        ?>
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
</div>
